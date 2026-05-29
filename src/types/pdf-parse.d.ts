declare module "pdf-parse" {
  interface PDFResult {
    text: string;
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown>;
    version: string;
  }

  function pdf(
    dataBuffer: Buffer | Uint8Array | ArrayBuffer,
    options?: Record<string, unknown>
  ): Promise<PDFResult>;

  export default pdf;
}
