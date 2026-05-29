"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, X, Loader2, AlertCircle, CheckCircle2, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { saveSession } from "@/lib/storage";
import { generateId, shuffleArray } from "@/lib/utils";
import type { Question } from "@/types";

type Step = "upload" | "processing" | "done";

export default function UploadPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<Step>("upload");
  const [error, setError] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFile = (f: File) => {
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (!["txt", "docx", "pdf"].includes(ext ?? "")) {
      setError("Format tidak didukung. Gunakan TXT, DOCX, atau PDF.");
      return;
    }
    setError("");
    setFile(f);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const handleSubmit = async () => {
    if (!file) return;
    setStep("processing");
    setError("");
    try {
      setStatusMsg("Membaca file...");
      const fd = new FormData();
      fd.append("file", file);
      const parseRes = await fetch("/api/parse-file", { method: "POST", body: fd });
      const parseData = await parseRes.json();
      if (!parseRes.ok) throw new Error(parseData.error);

      setStatusMsg("AI sedang membuat soal...");
      const genRes = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: parseData.text, count: 20 }),
      });
      const genData = await genRes.json();
      if (!genRes.ok) throw new Error(genData.error);

      const questions: Question[] = shuffleArray(genData.questions);
      const sessionId = generateId();
      saveSession({
        id: sessionId,
        title: file.name.replace(/\.[^.]+$/, ""),
        questions,
        answers: {},
        startedAt: Date.now(),
        timeLimit: 60 * 60,
      });

      setStep("done");
      setTimeout(() => router.push(`/exam/${sessionId}`), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setStep("upload");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
        <div style={{ width: "100%", maxWidth: 520 }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
              Upload Kisi-Kisi
            </h1>
            <p style={{ color: "var(--text-2)", fontSize: "0.95rem" }}>
              AI akan membuat 20 soal pilihan ganda dari kisi-kisi kamu
            </p>
          </div>

          <div className="card" style={{ padding: "2rem" }}>
            {step === "upload" && (
              <>
                {/* Drop zone */}
                <div
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  style={{
                    border: `2px dashed ${dragging ? "#6366f1" : file ? "#10b981" : "#d1d5db"}`,
                    borderRadius: 12, padding: "2.5rem 1.5rem", textAlign: "center",
                    cursor: "pointer",
                    background: dragging ? "#eef2ff" : file ? "#f0fdf4" : "var(--surface-2)",
                    transition: "all 0.15s", marginBottom: "1.25rem",
                  }}
                >
                  <input ref={inputRef} type="file" accept=".txt,.docx,.pdf" style={{ display: "none" }}
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

                  {file ? (
                    <>
                      <CheckCircle2 size={40} color="#10b981" style={{ margin: "0 auto 0.75rem", display: "block" }} />
                      <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.25rem" }}>{file.name}</p>
                      <p style={{ color: "var(--text-3)", fontSize: "0.8rem" }}>{(file.size / 1024).toFixed(1)} KB</p>
                    </>
                  ) : (
                    <>
                      <div style={{
                        width: 56, height: 56, borderRadius: 14,
                        background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 0.875rem",
                      }}>
                        <Upload size={24} color="#6366f1" />
                      </div>
                      <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.375rem" }}>
                        Drag & drop atau klik untuk upload
                      </p>
                      <p style={{ color: "var(--text-3)", fontSize: "0.8rem" }}>Mendukung TXT, DOCX, PDF</p>
                    </>
                  )}
                </div>

                {/* Format badges */}
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "1.5rem" }}>
                  {["TXT", "DOCX", "PDF"].map((fmt) => (
                    <span key={fmt} className="badge badge-indigo">
                      <FileText size={11} /> {fmt}
                    </span>
                  ))}
                </div>

                {error && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    background: "#fff1f2", border: "1px solid #fecdd3",
                    borderRadius: 8, padding: "0.75rem 1rem", marginBottom: "1.25rem",
                    color: "#e11d48", fontSize: "0.875rem",
                  }}>
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {file && (
                    <button onClick={() => setFile(null)} className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>
                      <X size={16} /> Hapus
                    </button>
                  )}
                  <button onClick={handleSubmit} disabled={!file} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                    <Zap size={16} /> Buat Soal
                  </button>
                </div>
              </>
            )}

            {step === "processing" && (
              <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.25rem",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}>
                  <Loader2 size={28} color="white" style={{ animation: "spin 1s linear infinite" }} />
                </div>
                <p style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem", fontSize: "1.05rem" }}>
                  {statusMsg}
                </p>
                <p style={{ color: "var(--text-3)", fontSize: "0.875rem" }}>
                  Mohon tunggu 10–30 detik
                </p>
                <style>{`
                  @keyframes spin { to { transform: rotate(360deg); } }
                  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.7; } }
                `}</style>
              </div>
            )}

            {step === "done" && (
              <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}>
                  <CheckCircle2 size={32} color="#10b981" />
                </div>
                <p style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem", fontSize: "1.05rem" }}>
                  Soal berhasil dibuat!
                </p>
                <p style={{ color: "var(--text-3)", fontSize: "0.875rem" }}>
                  Mengalihkan ke halaman ujian...
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
