import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sijian.vercel.app"),
  title: {
    default: "Sijian – Simulasi Ujian Berbasis AI & Latihan Soal Akurat",
    template: "%s | Sijian",
  },
  description:
    "Platform simulasi ujian berbasis AI terpercaya. Upload kisi-kisi ujian (TXT, DOCX, PDF), generate soal pilihan ganda acak otomatis, dan evaluasi hasil belajar kamu secara instan dengan Sijian.",
  keywords: [
    "simulasi ujian",
    "latihan soal",
    "kisi-kisi ujian",
    "AI soal ujian",
    "belajar online",
    "ujian sekolah",
    "tryout online",
    "pembuat soal otomatis",
    "bank soal ai",
    "persiapan ujian",
  ],
  authors: [{ name: "Rizqy Fajrul Syabani", url: "https://sijian.vercel.app" }],
  creator: "Rizqy Fajrul Syabani",
  publisher: "Sijian",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sijian.vercel.app",
    siteName: "Sijian",
    title: "Sijian – Simulasi Ujian Berbasis AI & Latihan Soal Otomatis",
    description:
      "Bantu persiapan ujianmu lebih efektif. Cukup upload kisi-kisi materi, biar AI Sijian buatkan simulasi soal pilihan ganda interaktif untukmu.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sijian – Platform Belajar & Simulasi Ujian Berbasis AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sijian – Simulasi Ujian Berbasis AI",
    description:
      "Upload kisi-kisi materi sekolah/kuliah dan biarkan AI membuat simulasi ujian pilihan ganda secara instan.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "oR1vFDbIf-85CemIwzQupghHx1F07kWTM9UCqgzdTG8",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalApplication",
    "name": "Sijian",
    "description": "Platform belajar mandiri dengan simulasi ujian otomatis berbasis artificial intelligence.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "url": "https://sijian.vercel.app",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    }
  };

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}