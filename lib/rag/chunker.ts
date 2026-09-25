import { ragConfig } from "./config";
import type { Document, Chunk } from "./types";

export function chunkDocument(doc: Document): Chunk[] {
  const { chunkSize, chunkOverlap } = ragConfig;
  const text = doc.content.trim();
  const chunks: Chunk[] = [];

  if (!text) return chunks;

  let start = 0;
  let index = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    let chunkText = text.slice(start, end);

    if (end < text.length) {
      const lastSpace = chunkText.lastIndexOf(" ");
      if (lastSpace > 0) {
        chunkText = chunkText.slice(0, lastSpace);
      }
    }

    const trimmed = chunkText.trim();
    if (trimmed.length > 0) {
      chunks.push({
        id: `${doc.id}-chunk-${index}`,
        sourceDocId: doc.id,
        content: trimmed,
        chunkIndex: index,
        metadata: doc.metadata,
      });
      index++;
    }

    // The final chunk already includes the remaining text; do not re-chunk its overlap.
    if (end === text.length) break;

    // guarantee forward progress no matter what
    const advance = Math.max(chunkText.length - chunkOverlap, 1);
    start += advance;
  }

  return chunks;
}
