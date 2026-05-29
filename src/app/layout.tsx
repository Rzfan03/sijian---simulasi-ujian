import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sijian.vercel.app"),
  title: {
    default: "Sijian – Simulasi Ujian Berbasis AI",
    template: "%s | Sijian",
  },
  description:
    "Upload kisi-kisi ujian (TXT, DOCX, PDF) dan AI akan otomatis membuat soal pilihan ganda acak untuk kamu latihan. Belajar lebih efektif dengan Sijian.",
  keywords: [
    "simulasi ujian",
    "latihan soal",
    "kisi-kisi ujian",
    "AI soal ujian",
    "belajar online",
    "ujian sekolah",
  ],
  authors: [{ name: "Sijian" }],
  creator: "Sijian",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sijian.vercel.app",
    siteName: "Sijian",
    title: "Sijian – Simulasi Ujian Berbasis AI",
    description:
      "Upload kisi-kisi ujian dan AI akan membuat soal pilihan ganda acak untuk kamu latihan.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sijian – Simulasi Ujian Berbasis AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sijian – Simulasi Ujian Berbasis AI",
    description:
      "Upload kisi-kisi ujian dan AI akan membuat soal pilihan ganda acak untuk kamu latihan.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
