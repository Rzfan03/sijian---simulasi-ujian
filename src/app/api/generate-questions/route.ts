import { NextRequest, NextResponse } from "next/server";
import { generateQuestionsFromText } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { text, count = 20 } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Teks kisi-kisi diperlukan" }, { status: 400 });
    }

    const questions = await generateQuestionsFromText(text, count);
    return NextResponse.json({ questions });
  } catch (err) {
    console.error("generate-questions error:", err);
    const message = err instanceof Error ? err.message : "Gagal generate soal";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
