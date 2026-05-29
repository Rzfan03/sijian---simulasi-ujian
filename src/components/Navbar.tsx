"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upload, X, Menu } from "lucide-react";

interface NavbarProps {
  onNavClick?: () => void;
}

const links = [
  { href: "/", label: "Beranda" },
  { href: "/#cara-kerja", label: "Cara Kerja" },
  { href: "/#fitur", label: "Fitur" },
];

export default function Navbar({ onNavClick }: NavbarProps) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const handleNav = (e: React.MouseEvent) => {
    if (onNavClick) {
      e.preventDefault();
      onNavClick();
    }
    setOpen(false);
  };

  return (
    <>
      <nav className="border-b border-zinc-200" style={{
        background: "white",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <Link href="/" onClick={handleNav} style={{ textDecoration: "none", flexShrink: 0 }}>
            <span style={{
              fontSize: "1.5rem",
              fontWeight: 900,
              color: "#6366f1",
              letterSpacing: "-0.02em",
            }}>
              Sijian
            </span>
          </Link>

          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {links.map((l) => {
              const isActive = path === l.href || (l.href !== "/" && path.startsWith(l.href.split("#")[0]));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={handleNav}
                  style={{
                    padding: "0.4rem 0.875rem",
                    borderRadius: 100,
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: isActive ? "#6366f1" : "var(--text-2)",
                    background: "transparent",
                    textDecoration: "none",
                    transition: "color 0.15s",
                    border: "2px solid transparent",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}

            <div style={{ width: 1, height: 20, background: "var(--border-dark)", margin: "0 0.5rem" }} />

            <Link
              href="/upload"
              onClick={handleNav}
              className="btn-fun btn-indigo"
              style={{ fontSize: "0.8rem", padding: "0.5rem 1.125rem" }}
            >
              <Upload size={14} /> Mulai Ujian
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="nav-toggle"
            style={{
              background: "none",
              border: "2px solid var(--border)",
              borderBottom: "3px solid var(--border-dark)",
              borderRadius: 10,
              cursor: "pointer",
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text)",
            }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div style={{
            background: "white",
            borderTop: "2px solid var(--border)",
            padding: "0.75rem 1.5rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}>
            {links.map((l) => {
              const isActive = path === l.href || (l.href !== "/" && path.startsWith(l.href.split("#")[0]));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={handleNav}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: 12,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: isActive ? "#6366f1" : "var(--text-2)",
                    background: "transparent",
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/upload"
              onClick={handleNav}
              className="btn-fun btn-indigo"
              style={{ marginTop: "0.5rem", justifyContent: "center" }}
            >
              <Upload size={16} /> Mulai Ujian
            </Link>
          </div>
        )}
      </nav>

      <style>{`
        .nav-toggle { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
