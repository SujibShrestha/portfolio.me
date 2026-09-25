import fs from "fs/promises";
import { PDFParse } from "pdf-parse";
import type { Document } from "../types";

export async function loadPdf(
  filePath: string,
  metadataOverrides: Partial<Document["metadata"]> = {}
): Promise<Document> {
  const buffer = await fs.readFile(filePath);

  const parser = new PDFParse({ data: buffer });
  let text: string;
  try {
    const data = await parser.getText();
    text = data.text.trim();
  } finally {
    await parser.destroy();
  }

  const fileName = filePath.split("/").pop() ?? filePath;

  return {
    id: `pdf/${fileName}`,
    content: text,
    metadata: {
      title: metadataOverrides.title ?? fileName.replace(/\.pdf$/i, ""),
      type: metadataOverrides.type ?? "resume",
      url: metadataOverrides.url,
      tags: metadataOverrides.tags ?? [],
      updatedAt: metadataOverrides.updatedAt,
    },
  };
}
