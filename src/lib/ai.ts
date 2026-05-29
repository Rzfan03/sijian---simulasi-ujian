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

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 8000,
  });

  const content = completion.choices[0]?.message?.content ?? "[]";
  const jsonStr = extractJSON(content);
  const cleaned = cleanJSON(jsonStr);

  let raw: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }>;

  try {
    raw = JSON.parse(cleaned);
  } catch {
    try {
      raw = JSON.parse(jsonStr);
    } catch {
      throw new Error(
        "Gagal memproses respons AI. Silakan coba upload ulang."
      );
    }
  }

  return raw.map((q) => ({
    id: generateId(),
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  }));
}
