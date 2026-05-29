import Groq from "groq-sdk";
import type { Question } from "@/types";
import { generateId } from "./utils";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function sanitizeText(text: string): string {
  return text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\t/g, " ")
    .trim()
    .slice(0, 8000);
}

function extractJSON(raw: string): string {
  const codeBlock = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = codeBlock ? codeBlock[1] : raw;
  const match = jsonStr.match(/\[[\s\S]*\]/);
  if (!match) throw new Error("AI tidak menghasilkan format JSON yang valid");
  return match[0];
}

function cleanJSON(str: string): string {
  let s = str.trim();
  s = s.replace(/,\s*([}\]])/g, "$1");
  s = s.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
  return s;
}

async function callGroq(prompt: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
    max_tokens: 8000,
  });
  return completion.choices[0]?.message?.content ?? "[]";
}

function parseQuestions(content: string) {
  const jsonStr = extractJSON(content);
  const cleaned = cleanJSON(jsonStr);

  try {
    return JSON.parse(cleaned);
  } catch {
    return JSON.parse(jsonStr);
  }
}

export async function generateQuestionsFromText(
  text: string,
  count: number = 20
): Promise<Question[]> {
  const clean = sanitizeText(text);

  const prompt = `Kamu adalah pembuat soal ujian sekolah profesional. Berdasarkan kisi-kisi berikut, buat ${count} soal pilihan ganda dalam Bahasa Indonesia.

KISI-KISI:
${clean}

INSTRUKSI:
- Buat tepat ${count} soal pilihan ganda
- Setiap soal memiliki 4 pilihan (A, B, C, D)
- Soal harus bervariasi dan mencakup semua topik dalam kisi-kisi
- Acak urutan soal dan pilihan jawaban
- Berikan penjelasan singkat untuk jawaban yang benar

Balas HANYA dengan JSON array berikut (tanpa teks lain, tanpa markdown, tanpa backticks):
[
  {
    "question": "Pertanyaan soal di sini?",
    "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
    "correctAnswer": 0,
    "explanation": "Penjelasan singkat mengapa jawaban ini benar"
  }
]

correctAnswer adalah index (0-3) dari pilihan yang benar.`;

  let lastErr: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const content = await callGroq(prompt);
      const raw = parseQuestions(content);

      if (!Array.isArray(raw) || raw.length === 0) {
        throw new Error("AI mengembalikan array kosong");
      }

      return raw.map((q: any) => ({
        id: generateId(),
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      }));
    } catch (err) {
      lastErr = err;
      if (attempt === 0) {
        const msg =
          err instanceof Error ? err.message : "Gagal memproses respons AI";
        console.warn(`AI attempt ${attempt + 1} failed:`, msg);
      }
    }
  }

  const msg =
    lastErr instanceof Error ? lastErr.message : "Gagal memproses respons AI";
  throw new Error(msg);
}
