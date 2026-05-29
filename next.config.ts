import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mammoth", "pdf-parse", "pdfjs-dist"],
};

export default nextConfig;
