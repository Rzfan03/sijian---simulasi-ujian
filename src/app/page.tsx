"use client";

import Link from "next/link";
import { Upload, Zap, Shuffle, BarChart3, ArrowRight, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function IlloUpload() {
  return (
    <svg width="120" height="110" viewBox="0 0 160 140" fill="none">
      <ellipse cx="80" cy="132" rx="48" ry="7" fill="#6366f1" opacity="0.1"/>
      <rect x="30" y="18" width="100" height="108" rx="14" fill="white" stroke="#e5e7eb" strokeWidth="1.5"/>
      <path d="M105 18 L130 43 L105 43 Z" fill="#e0e7ff"/>
      <rect x="44" y="58" width="52" height="5" rx="2.5" fill="#c7d2fe"/>
      <rect x="44" y="70" width="68" height="5" rx="2.5" fill="#e0e7ff"/>
      <rect x="44" y="82" width="40" height="5" rx="2.5" fill="#e0e7ff"/>
      <circle cx="80" cy="30" r="16" fill="#6366f1"/>
      <path d="M80 37 L80 23 M74 29 L80 23 L86 29" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IlloAI() {
  return (
    <svg width="120" height="110" viewBox="0 0 160 140" fill="none">
      <ellipse cx="80" cy="132" rx="48" ry="7" fill="#8b5cf6" opacity="0.1"/>
      <rect x="38" y="28" width="84" height="72" rx="20" fill="#8b5cf6"/>
      <rect x="38" y="28" width="84" height="72" rx="20" fill="url(#g1)" opacity="0.4"/>
      <circle cx="64" cy="56" r="11" fill="white"/>
      <circle cx="96" cy="56" r="11" fill="white"/>
      <circle cx="64" cy="56" r="5.5" fill="#6366f1"/>
      <circle cx="96" cy="56" r="5.5" fill="#6366f1"/>
      <circle cx="66" cy="54" r="2" fill="white"/>
      <circle cx="98" cy="54" r="2" fill="white"/>
      <path d="M64 74 Q80 84 96 74" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <line x1="80" y1="28" x2="80" y2="14" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="80" cy="10" r="5" fill="#a78bfa"/>
      <rect x="58" y="100" width="44" height="26" rx="10" fill="#7c3aed"/>
      <defs>
        <linearGradient id="g1" x1="38" y1="28" x2="122" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c4b5fd"/>
          <stop offset="1" stopColor="#7c3aed" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function IlloExam() {
  return (
    <svg width="120" height="110" viewBox="0 0 160 140" fill="none">
      <ellipse cx="80" cy="132" rx="48" ry="7" fill="#10b981" opacity="0.1"/>
      <rect x="28" y="22" width="104" height="108" rx="14" fill="white" stroke="#e5e7eb" strokeWidth="1.5"/>
      <rect x="58" y="14" width="44" height="18" rx="9" fill="#6366f1"/>
      <circle cx="50" cy="60" r="8" fill="#d1fae5"/>
      <path d="M47 60 L49.5 62.5 L54 57.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="64" y="56" width="52" height="5" rx="2.5" fill="#e5e7eb"/>
      <circle cx="50" cy="82" r="8" fill="#d1fae5"/>
      <path d="M47 82 L49.5 84.5 L54 79.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="64" y="78" width="40" height="5" rx="2.5" fill="#e5e7eb"/>
      <circle cx="50" cy="104" r="8" fill="#fef3c7"/>
      <rect x="64" y="100" width="52" height="5" rx="2.5" fill="#e5e7eb"/>
      <circle cx="122" cy="36" r="16" fill="#6366f1"/>
      <path d="M122 30 L122 36 L127 39" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IlloResult() {
  return (
    <svg width="120" height="110" viewBox="0 0 160 140" fill="none">
      <ellipse cx="80" cy="132" rx="48" ry="7" fill="#f59e0b" opacity="0.1"/>
      <path d="M52 24 L108 24 L108 78 Q108 104 80 110 Q52 104 52 78 Z" fill="#fbbf24"/>
      <path d="M52 24 L108 24 L108 78 Q108 104 80 110 Q52 104 52 78 Z" fill="url(#g2)" opacity="0.5"/>
      <path d="M52 36 Q32 36 32 58 Q32 74 52 74" stroke="#f59e0b" strokeWidth="9" strokeLinecap="round" fill="none"/>
      <path d="M108 36 Q128 36 128 58 Q128 74 108 74" stroke="#f59e0b" strokeWidth="9" strokeLinecap="round" fill="none"/>
      <path d="M80 44 L83.5 54.5 L95 54.5 L86 61 L89.5 71.5 L80 65 L70.5 71.5 L74 61 L65 54.5 L76.5 54.5 Z" fill="white" opacity="0.9"/>
      <rect x="68" y="110" width="24" height="8" rx="2" fill="#d97706"/>
      <rect x="60" y="118" width="40" height="8" rx="4" fill="#d97706"/>
      <defs>
        <linearGradient id="g2" x1="52" y1="24" x2="108" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde68a"/>
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

const steps = [
  { illo: <IlloUpload />, num: "01", title: "Upload Kisi-Kisi", desc: "Drag & drop file TXT, DOCX, atau PDF kisi-kisi ujian kamu." },
  { illo: <IlloAI />, num: "02", title: "AI Buat Soal", desc: "AI otomatis membuat 20 soal pilihan ganda dari teks kisi-kisi kamu." },
  { illo: <IlloExam />, num: "03", title: "Kerjakan Ujian", desc: "Jawab soal dengan timer, navigasi bebas antar soal." },
  { illo: <IlloResult />, num: "04", title: "Lihat Hasil", desc: "Skor, review jawaban, dan penjelasan tiap soal." },
];

const features = [
  { icon: <Upload size={20} />, title: "Upload Mudah", desc: "Drag & drop atau klik untuk upload. Mendukung TXT, DOCX, dan PDF.", bg: "#eef2ff", color: "#6366f1" },
  { icon: <Zap size={20} />, title: "AI Cepat", desc: "AI menghasilkan 20 soal berkualitas dalam 10–30 detik.", bg: "#f0fdf4", color: "#059669" },
  { icon: <Shuffle size={20} />, title: "Soal Acak", desc: "Setiap sesi soal dan pilihan jawaban diacak otomatis.", bg: "#fef3c7", color: "#d97706" },
  { icon: <BarChart3 size={20} />, title: "Analisis Hasil", desc: "Lihat skor, review tiap soal, dan penjelasan jawaban benar.", bg: "#fce7f3", color: "#db2777" },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* ===== HERO ===== */}
      <section style={{
        minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "6rem 1.5rem", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {/* Background SVG */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <svg width="100%" height="100%" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
            <defs>
              <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#eef2ff" />
                <stop offset="100%" stopColor="#f8fafc" />
              </linearGradient>
            </defs>
            <rect width="1440" height="600" fill="url(#bg-grad)" />
            <circle cx="200" cy="150" r="180" fill="#6366f1" opacity="0.04" />
            <circle cx="1200" cy="200" r="220" fill="#8b5cf6" opacity="0.04" />
            <circle cx="720" cy="400" r="140" fill="#6366f1" opacity="0.03" />
            <path d="M0 600 L60 560 L120 580 L180 540 L240 560 L300 530 L360 550 L420 520 L480 540 L540 510 L600 530 L660 500 L720 520 L780 490 L840 510 L900 480 L960 500 L1020 470 L1080 490 L1140 460 L1200 480 L1260 450 L1320 470 L1380 440 L1440 460 L1440 600 Z" fill="#6366f1" opacity="0.03" />
            <rect x="80" y="80" width="40" height="50" rx="4" fill="#6366f1" opacity="0.06" transform="rotate(-8 80 80)" />
            <rect x="1320" y="70" width="50" height="40" rx="5" fill="#8b5cf6" opacity="0.06" transform="rotate(6 1320 70)" />
            <path d="M280 480 L284 490 L294 492 L286 498 L288 508 L280 502 L272 508 L274 498 L266 492 L276 490 Z" fill="#fbbf24" opacity="0.08" />
            <path d="M1150 120 L1153 128 L1161 130 L1155 136 L1157 144 L1150 138 L1143 144 L1145 136 L1139 130 L1147 128 Z" fill="#fbbf24" opacity="0.06" />
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
          <h1 style={{
            fontSize: "clamp(2.25rem, 12vw, 3.27rem)", fontWeight: 800,
            color: "var(--text)", lineHeight: 1.1, letterSpacing: "-0.03em",
            marginBottom: "1rem",
          }}>
            Simulasi Ujian dari{" "}
            <span style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Kisi-Kisi
            </span>
            <br />dalam Hitungan Detik
          </h1>
          <p style={{
            fontSize: "1.125rem", color: "var(--text-2)", lineHeight: 1.7,
            maxWidth: 560, margin: "0 auto 2rem",
          }}>
            Upload file kisi-kisi ujian (TXT, DOCX, PDF), AI langsung ubah jadi soal pilihan ganda acak. Gratis, tanpa daftar.
          </p>
          <Link href="/upload" className="btn btn-primary" style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}>
            <Upload size={18} /> Mulai Sekarang <ArrowRight size={16} />
          </Link>
        </div>

        {/* Feature chips */}
        <div style={{
          display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap",
          marginTop: "3.5rem", position: "relative", zIndex: 1,
        }}>
          {[
            { icon: <FileText size={16} />, label: "Upload TXT, DOCX, PDF", color: "#6366f1", bg: "#eef2ff" },
            { icon: <Zap size={16} />, label: "AI Generate 20 Soal", color: "#059669", bg: "#f0fdf4" },
            { icon: <Shuffle size={16} />, label: "Soal & Jawaban Acak", color: "#d97706", bg: "#fef3c7" },
            { icon: <BarChart3 size={16} />, label: "Review & Skor", color: "#db2777", bg: "#fce7f3" },
          ].map((f) => (
            <div key={f.label} style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.625rem 1.125rem", borderRadius: 100,
              background: f.bg, color: f.color,
              fontSize: "0.85rem", fontWeight: 600, whiteSpace: "nowrap",
            }}>
              {f.icon} {f.label}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CARA KERJA ===== */}
      <section id="cara-kerja" style={{ padding: "5rem 1.5rem", background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}>
              4 Langkah Mudah
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
          }}>
            {steps.map((s) => (
              <div
                key={s.num}
                className="card"
                style={{ padding: "1.75rem 1.5rem", textAlign: "center", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>{s.illo}</div>
                <span className="badge badge-indigo" style={{ marginBottom: "0.625rem" }}>{s.num}</span>
                <h3 style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text)", marginBottom: "0.375rem" }}>{s.title}</h3>
                <p style={{ color: "var(--text-2)", fontSize: "0.85rem", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FITUR ===== */}
      <section id="fitur" style={{ padding: "5rem 1.5rem", background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}>
              Semua yang kamu butuhkan
            </h2>
            <p style={{ color: "var(--text-2)", marginTop: "0.5rem", fontSize: "0.95rem" }}>
              Dirancang sederhana, cepat, dan efektif.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}>
            {features.map((f) => (
              <div key={f.title} className="card" style={{ padding: "1.5rem" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: f.bg, color: f.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1rem",
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text)", marginBottom: "0.375rem" }}>{f.title}</h3>
                <p style={{ color: "var(--text-2)", fontSize: "0.85rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BOTTOM ===== */}
      <section style={{ padding: "5rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #eef2ff 0%, #faf5ff 50%, #ecfdf5 100%)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", display: "flex", alignItems: "center", gap: "4rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800,
              color: "var(--text)", lineHeight: 1.2, letterSpacing: "-0.03em", marginBottom: "1rem",
            }}>
              Siap hadapi ujian dengan{" "}
              <span style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                latihan soal
              </span>
              <br />langsung dari kisi-kisi kamu
            </h2>
            <p style={{ color: "var(--text-2)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 440 }}>
              Upload kisi-kisi ujian kamu. AI langsung ubah jadi soal pilihan ganda. Gratis, tanpa daftar.
            </p>
            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
              <Link href="/upload" className="btn btn-primary" style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}>
                <Upload size={18} /> Upload Kisi-Kisi <ArrowRight size={16} />
              </Link>
              <Link href="#cara-kerja" className="btn btn-ghost" style={{ fontSize: "1rem", padding: "0.875rem 1.5rem" }}>
                Pelajari Dulu
              </Link>
            </div>
          </div>

          <div className="cta-illo" style={{ flexShrink: 0 }}>
            <svg width="340" height="340" viewBox="0 0 340 340" fill="none">
              <ellipse cx="170" cy="320" rx="90" ry="14" fill="#6366f1" opacity="0.08" />
              <rect x="118" y="152" width="104" height="96" rx="28" fill="#e0e7ff" />
              <rect x="118" y="152" width="104" height="96" rx="28" fill="url(#bodyGrad)" />
              <circle cx="170" cy="118" r="44" fill="#fcd9b6" />
              <circle cx="170" cy="118" r="44" fill="url(#headGrad)" opacity="0.3" />
              <path d="M126 108 Q170 72 214 108 Q214 88 170 78 Q126 88 126 108Z" fill="#1e293b" />
              <ellipse cx="156" cy="114" rx="5" ry="6" fill="#1e293b" />
              <ellipse cx="184" cy="114" rx="5" ry="6" fill="#1e293b" />
              <circle cx="158" cy="112" r="2" fill="white" />
              <circle cx="186" cy="112" r="2" fill="white" />
              <path d="M160 130 Q170 140 180 130" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <ellipse cx="148" cy="128" rx="8" ry="5" fill="#fecdd3" opacity="0.6" />
              <ellipse cx="192" cy="128" rx="8" ry="5" fill="#fecdd3" opacity="0.6" />
              <path d="M118 180 Q90 176 82 200 Q74 224 100 230" stroke="#fcd9b6" strokeWidth="14" strokeLinecap="round" fill="none" />
              <circle cx="100" cy="230" r="7" fill="#fcd9b6" />
              <path d="M222 180 Q250 164 254 140" stroke="#fcd9b6" strokeWidth="14" strokeLinecap="round" fill="none" />
              <circle cx="254" cy="140" r="7" fill="#fcd9b6" />
              <rect x="64" y="212" width="36" height="44" rx="4" fill="#6366f1" />
              <rect x="64" y="212" width="18" height="44" rx="4" fill="#4f46e5" />
              <line x1="78" y1="222" x2="94" y2="222" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="78" y1="230" x2="94" y2="230" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="78" y1="238" x2="94" y2="238" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="70" y1="222" x2="76" y2="222" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="70" y1="230" x2="76" y2="230" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="70" y1="238" x2="76" y2="238" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M284 128 L286 134 L292 136 L286 138 L284 144 L282 138 L276 136 L282 134 Z" fill="#fbbf24" opacity="0.5" />
              <circle cx="72" cy="156" r="4" fill="#34d399" opacity="0.5" />
              <circle cx="248" cy="96" r="3" fill="#fbbf24" opacity="0.6" />
              <defs>
                <linearGradient id="bodyGrad" x1="118" y1="152" x2="222" y2="248">
                  <stop stopColor="#c7d2fe" />
                  <stop offset="1" stopColor="#e0e7ff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="headGrad" x1="126" y1="74" x2="214" y2="162">
                  <stop stopColor="#fde68a" />
                  <stop offset="1" stopColor="#fcd9b6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`@media (max-width: 768px) { .cta-illo { display: none; } }`}</style>
    </div>
  );
}
