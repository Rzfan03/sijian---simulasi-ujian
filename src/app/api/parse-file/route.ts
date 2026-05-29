import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json(
        { error: "File terlalu besar atau format request tidak valid" },
        { status: 413 }
      );
    }

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    let text = "";

    try {
      if (ext === "txt") {
        text = await file.text();
      } else if (ext === "docx") {
        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await mammoth.extractRawText({ buffer });
        text = result.value;
      } else if (ext === "pdf") {
        const { PDFParse } = await import("pdf-parse");
        const buffer = new Uint8Array(await file.arrayBuffer());
        const pdf = new PDFParse({ data: buffer });
        const result = await pdf.getText();
        await pdf.destroy();
        text = result.text;
      } else {
        return NextResponse.json(
          { error: "Format file tidak didukung. Gunakan TXT, DOCX, atau PDF." },
          { status: 400 }
        );
      }
    } catch (parseErr) {
      console.error("file parsing error:", parseErr);
      const msg = parseErr instanceof Error ? parseErr.message : "Gagal memproses file";
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    if (!text.trim()) {
      return NextResponse.json({ error: "File kosong atau tidak bisa dibaca" }, { status: 400 });
    }

    return NextResponse.json({ text: text.trim() });
  } catch (err) {
    console.error("parse-file error:", err);
    return NextResponse.json({ error: "Gagal memproses file" }, { status: 500 });
  }
}
