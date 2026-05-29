import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    let text = "";

    if (ext === "txt") {
      text = await file.text();
    } else if (ext === "docx") {
      const mammoth = await import("mammoth");
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (ext === "pdf") {
      const buffer = Buffer.from(await file.arrayBuffer());
      text = await extractPdfText(buffer);
    } else {
      return NextResponse.json(
        { error: "Format file tidak didukung. Gunakan TXT, DOCX, atau PDF." },
        { status: 400 }
      );
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

async function extractPdfText(buffer: Buffer): Promise<string> {
  const { PDFParse } = await import("pdf-parse");
  const pdf = new PDFParse({ data: new Uint8Array(buffer) });
  const result = await pdf.getText();
  await pdf.destroy();
  return result.text;
}
