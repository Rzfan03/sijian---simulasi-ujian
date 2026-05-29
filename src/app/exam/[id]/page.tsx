"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Clock, CheckSquare, AlertCircle } from "lucide-react";
import * as Progress from "@radix-ui/react-progress";
import Navbar from "@/components/Navbar";
import { getSession, saveSession, saveResult } from "@/lib/storage";
import { formatTime } from "@/lib/utils";
import type { ExamSession } from "@/types";

export default function ExamPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [session, setSession] = useState<ExamSession | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showLeaveWarn, setShowLeaveWarn] = useState(false);

  useEffect(() => {
    const s = getSession(id);
    if (!s) { router.push("/upload"); return; }
    setSession(s);
    setAnswers(s.answers);
    const elapsed = Math.floor((Date.now() - s.startedAt) / 1000);
    setTimeLeft(Math.max(0, s.timeLimit - elapsed));
  }, [id, router]);

  const finish = useCallback(() => {
    if (!session) return;
    const score = session.questions.reduce((acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0), 0);
    saveResult({
      sessionId: session.id, score, total: session.questions.length,
      percentage: Math.round((score / session.questions.length) * 100),
      timeTaken: session.timeLimit - timeLeft, answers, questions: session.questions,
    });
    saveSession({ ...session, answers, finishedAt: Date.now() });
    router.push(`/result/${session.id}`);
  }, [session, answers, timeLeft, router]);

  useEffect(() => {
    if (timeLeft <= 0 && session) { finish(); return; }
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, session, finish]);

  useEffect(() => {
    const before = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", before);
    return () => window.removeEventListener("beforeunload", before);
  }, []);

  useEffect(() => {
    const pop = () => { setShowLeaveWarn(true); };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);

  if (!session) return null;

  const q = session.questions[current];
  const answered = Object.keys(answers).length;
  const progress = (answered / session.questions.length) * 100;
  const isLowTime = timeLeft < 300;

  const selectAnswer = (idx: number) => {
    const next = { ...answers, [q.id]: idx };
    setAnswers(next);
    saveSession({ ...session, answers: next });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar onNavClick={() => setShowLeaveWarn(true)} />

      <div style={{
        background: "var(--surface)", borderBottom: "1px solid var(--border)",
        padding: "0.75rem 1rem", position: "sticky", top: 60, zIndex: 40,
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.625rem" }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60vw" }}>{session.title}</p>
              <p style={{ color: "var(--text-3)", fontSize: "0.75rem" }}>{answered}/{session.questions.length} dijawab</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexShrink: 0 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0.375rem",
                color: isLowTime ? "#e11d48" : "var(--text-2)",
                fontWeight: 700, fontSize: "0.95rem",
                background: isLowTime ? "#fff1f2" : "var(--surface-2)",
                padding: "0.375rem 0.75rem", borderRadius: 8,
              }}>
                <Clock size={14} /> {formatTime(timeLeft)}
              </div>
              <button onClick={() => setShowConfirm(true)} className="btn btn-primary" style={{ padding: "0.5rem 0.875rem", fontSize: "0.8rem" }}>
                <CheckSquare size={14} /> Selesai
              </button>
            </div>
          </div>
          <Progress.Root value={progress} style={{ height: 6, background: "#e5e7eb", borderRadius: 100, overflow: "hidden" }}>
            <Progress.Indicator style={{ height: "100%", background: "var(--indigo)", borderRadius: 100, transition: "width 0.3s", width: `${progress}%` }} />
          </Progress.Root>
        </div>
      </div>

      <main style={{ flex: 1, padding: "1.5rem" }}>
        <style>{`
          @media (max-width: 640px) {
            .exam-grid { grid-template-columns: 1fr !important; }
            .exam-nav { order: -1; }
            .exam-nav-grid { grid-template-columns: repeat(10, 1fr) !important; }
          }
        `}</style>
        <div className="exam-grid" style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 200px", gap: "1.25rem", alignItems: "start" }}>

          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <span className="badge badge-indigo">Soal {current + 1}</span>
              <span style={{ color: "var(--text-3)", fontSize: "0.8rem" }}>dari {session.questions.length}</span>
            </div>
            <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
              {q.question}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {q.options.map((opt, i) => {
                const selected = answers[q.id] === i;
                return (
                  <button key={i} onClick={() => selectAnswer(i)} style={{
                    display: "flex", alignItems: "flex-start", gap: "0.875rem",
                    padding: "1rem 1.25rem", borderRadius: 10, textAlign: "left",
                    border: `2px solid ${selected ? "var(--indigo)" : "var(--border)"}`,
                    background: selected ? "#eef2ff" : "var(--surface)",
                    cursor: "pointer", transition: "all 0.15s", width: "100%",
                  }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                      background: selected ? "var(--indigo)" : "var(--surface-2)",
                      color: selected ? "white" : "var(--text-2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: "0.8rem",
                    }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span style={{ color: selected ? "var(--indigo)" : "var(--text)", fontWeight: selected ? 600 : 400, fontSize: "0.95rem", lineHeight: 1.5, paddingTop: "0.125rem" }}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
              <button onClick={() => setCurrent((p) => Math.max(0, p - 1))} disabled={current === 0} className="btn btn-ghost">
                <ChevronLeft size={16} /> Sebelumnya
              </button>
              <button onClick={() => setCurrent((p) => Math.min(session.questions.length - 1, p + 1))} disabled={current === session.questions.length - 1} className="btn btn-primary">
                Berikutnya <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="card exam-nav" style={{ padding: "1.25rem" }}>
            <p style={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--text)", marginBottom: "0.875rem" }}>Navigasi Soal</p>
            <div className="exam-nav-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.375rem" }}>
              {session.questions.map((sq, i) => {
                const isAnswered = answers[sq.id] !== undefined;
                const isCurrent = i === current;
                return (
                  <button key={sq.id} onClick={() => setCurrent(i)} style={{
                    aspectRatio: "1", borderRadius: 7,
                    border: `2px solid ${isCurrent ? "var(--indigo)" : "transparent"}`,
                    background: isCurrent ? "#eef2ff" : isAnswered ? "var(--indigo)" : "var(--surface-2)",
                    color: isCurrent ? "var(--indigo)" : isAnswered ? "white" : "var(--text-3)",
                    fontWeight: 700, fontSize: "0.72rem", cursor: "pointer", transition: "all 0.1s",
                  }}>
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              {[
                { bg: "var(--indigo)", label: "Dijawab" },
                { bg: "var(--surface-2)", label: "Belum" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.72rem", color: "var(--text-3)" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: s.bg }} /> {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {showLeaveWarn && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem" }}
          onClick={() => setShowLeaveWarn(false)}>
          <div className="card" style={{ padding: "2rem", maxWidth: 400, width: "100%" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AlertCircle size={20} color="#d97706" />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)" }}>Tinggalkan Ujian?</h3>
            </div>
            <p style={{ color: "var(--text-2)", fontSize: "0.9rem", marginBottom: "0.5rem", lineHeight: 1.6 }}>
              Ujian sedang berlangsung. Kamu baru menjawab <strong>{answered}</strong> dari <strong>{session.questions.length}</strong> soal.
            </p>
            <p style={{ color: "var(--text-3)", fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              Jika kamu keluar sekarang, jawaban akan tetap tersimpan dan kamu bisa melanjutkan lain waktu.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => {
                setShowLeaveWarn(false);
                window.history.pushState(null, "", window.location.href);
              }} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                Lanjutkan Ujian
              </button>
              <button onClick={() => router.push("/")} className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>
                Yakin, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem" }}
          onClick={() => setShowConfirm(false)}>
          <div className="card" style={{ padding: "2rem", maxWidth: 400, width: "100%" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AlertCircle size={20} color="#d97706" />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)" }}>Selesaikan Ujian?</h3>
            </div>
            <p style={{ color: "var(--text-2)", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              Kamu baru menjawab <strong>{answered}</strong> dari <strong>{session.questions.length}</strong> soal.
              {answered < session.questions.length && " Soal yang belum dijawab dianggap salah."}
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setShowConfirm(false)} className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>Lanjutkan</button>
              <button onClick={finish} className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Selesai</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
