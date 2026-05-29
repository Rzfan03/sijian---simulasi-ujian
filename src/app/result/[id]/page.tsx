"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Clock, RotateCcw, Home, ChevronDown, ChevronUp } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getResult } from "@/lib/storage";
import { formatTime } from "@/lib/utils";
import type { ExamResult } from "@/types";

export default function ResultPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [result, setResult] = useState<ExamResult | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const r = getResult(id);
    if (!r) { router.push("/upload"); return; }
    setResult(r);
  }, [id, router]);

  if (!result) return null;

  const { score, total, percentage, timeTaken, questions, answers } = result;
  const grade = percentage >= 90 ? "A" : percentage >= 80 ? "B" : percentage >= 70 ? "C" : percentage >= 60 ? "D" : "E";
  const gradeColor = percentage >= 80 ? "#059669" : percentage >= 60 ? "#d97706" : "#e11d48";
  const gradeBg = percentage >= 80 ? "#f0fdf4" : percentage >= 60 ? "#fef3c7" : "#fff1f2";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1, padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          <div className="card" style={{ padding: "2.5rem", textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{
              width: 88, height: 88, borderRadius: "50%",
              background: gradeBg, border: `3px solid ${gradeColor}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: "2.25rem", color: gradeColor,
              margin: "0 auto 1.25rem",
            }}>
              {grade}
            </div>

            <div style={{ fontSize: "3.5rem", fontWeight: 800, color: gradeColor, letterSpacing: "-0.04em", lineHeight: 1 }}>
              {percentage}%
            </div>
            <p style={{ color: "var(--text-2)", fontSize: "1rem", marginTop: "0.5rem", marginBottom: "2rem" }}>
              {score} dari {total} soal benar
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              {[
                { icon: <CheckCircle2 size={16} color="#059669" />, label: "Benar", val: score, color: "#059669" },
                { icon: <XCircle size={16} color="#e11d48" />, label: "Salah", val: total - score, color: "#e11d48" },
                { icon: <Clock size={16} color="var(--text-3)" />, label: "Waktu", val: formatTime(timeTaken), color: "var(--text-2)" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", justifyContent: "center", marginBottom: "0.25rem" }}>
                    {s.icon}
                    <span style={{ fontWeight: 800, fontSize: "1.375rem", color: s.color }}>{s.val}</span>
                  </div>
                  <span style={{ color: "var(--text-3)", fontSize: "0.78rem" }}>{s.label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => router.push("/upload")} className="btn btn-primary">
                <RotateCcw size={15} /> Ujian Baru
              </button>
              <button onClick={() => router.push("/")} className="btn btn-ghost">
                <Home size={15} /> Beranda
              </button>
            </div>
          </div>

          <div className="card" style={{ overflow: "hidden" }}>
            <Tabs.Root defaultValue="all">
              <Tabs.List style={{ display: "flex", borderBottom: "1px solid var(--border)", padding: "0 1.5rem" }}>
                {[
                  { val: "all", label: `Semua (${total})` },
                  { val: "correct", label: `Benar (${score})` },
                  { val: "wrong", label: `Salah (${total - score})` },
                ].map((t) => (
                  <Tabs.Trigger key={t.val} value={t.val} style={{
                    padding: "1rem 1.125rem", fontWeight: 600, fontSize: "0.875rem",
                    color: "var(--text-3)", border: "none", background: "none",
                    cursor: "pointer", borderBottom: "2px solid transparent", transition: "all 0.15s",
                  }}
                    className="result-tab"
                  >
                    {t.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              {(["all", "correct", "wrong"] as const).map((tab) => (
                <Tabs.Content key={tab} value={tab} style={{ padding: "1rem 1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {questions
                      .filter((q) => {
                        const ok = answers[q.id] === q.correctAnswer;
                        if (tab === "correct") return ok;
                        if (tab === "wrong") return !ok;
                        return true;
                      })
                      .map((q) => {
                        const isCorrect = answers[q.id] === q.correctAnswer;
                        const isOpen = expanded === q.id;
                        return (
                          <div key={q.id} style={{
                            border: `1px solid ${isCorrect ? "#bbf7d0" : "#fecdd3"}`,
                            borderRadius: 10, overflow: "hidden",
                          }}>
                            <button onClick={() => setExpanded(isOpen ? null : q.id)} style={{
                              width: "100%", display: "flex", alignItems: "flex-start", gap: "0.75rem",
                              padding: "1rem", background: isCorrect ? "#f0fdf4" : "#fff1f2",
                              border: "none", cursor: "pointer", textAlign: "left",
                            }}>
                              {isCorrect
                                ? <CheckCircle2 size={18} color="#059669" style={{ flexShrink: 0, marginTop: 2 }} />
                                : <XCircle size={18} color="#e11d48" style={{ flexShrink: 0, marginTop: 2 }} />
                              }
                              <span style={{ flex: 1, fontWeight: 500, fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.5 }}>
                                <span style={{ color: "var(--text-3)", fontSize: "0.78rem", marginRight: "0.5rem" }}>
                                  #{questions.indexOf(q) + 1}
                                </span>
                                {q.question}
                              </span>
                              {isOpen ? <ChevronUp size={16} color="var(--text-3)" style={{ flexShrink: 0 }} /> : <ChevronDown size={16} color="var(--text-3)" style={{ flexShrink: 0 }} />}
                            </button>

                            {isOpen && (
                              <div style={{ padding: "1rem", background: "var(--surface)", borderTop: `1px solid ${isCorrect ? "#bbf7d0" : "#fecdd3"}` }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                                  {q.options.map((opt, oi) => {
                                    const isUserChoice = answers[q.id] === oi;
                                    const isCorrectOpt = q.correctAnswer === oi;
                                    return (
                                      <div key={oi} style={{
                                        display: "flex", alignItems: "center", gap: "0.625rem",
                                        padding: "0.625rem 0.875rem", borderRadius: 8,
                                        background: isCorrectOpt ? "#f0fdf4" : isUserChoice ? "#fff1f2" : "var(--surface-2)",
                                        border: `1px solid ${isCorrectOpt ? "#bbf7d0" : isUserChoice ? "#fecdd3" : "var(--border)"}`,
                                      }}>
                                        <span style={{ fontWeight: 700, fontSize: "0.75rem", color: "var(--text-3)", width: 16 }}>
                                          {String.fromCharCode(65 + oi)}
                                        </span>
                                        <span style={{ fontSize: "0.875rem", color: "var(--text)", flex: 1 }}>{opt}</span>
                                        {isCorrectOpt && <CheckCircle2 size={14} color="#059669" />}
                                        {isUserChoice && !isCorrectOpt && <XCircle size={14} color="#e11d48" />}
                                      </div>
                                    );
                                  })}
                                </div>
                                {q.explanation && (
                                  <div style={{
                                    background: "#fffbeb", border: "1px solid #fde68a",
                                    borderRadius: 8, padding: "0.75rem",
                                    fontSize: "0.85rem", color: "#92400e", lineHeight: 1.6,
                                  }}>
                                    <strong>Penjelasan:</strong> {q.explanation}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </div>
        </div>
      </main>

      <style>{`.result-tab[data-state="active"] { color: var(--indigo) !important; border-bottom-color: var(--indigo) !important; }`}</style>
      <Footer />
    </div>
  );
}
