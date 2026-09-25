import { ragConfig } from "./config";
import type { RetrievedChunk } from "./types";

export function buildPrompt(question: string, chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) {
    return `${ragConfig.systemPrompt}

No relevant context was found in the knowledge base for this question.
Politely tell the user you don't have information about that, and don't guess.

Question: ${question}`;
  }

  const contextBlock = chunks
    .map((chunk, i) => {
      const label = chunk.metadata.title ?? chunk.sourceDocId;
      return `[Source ${i + 1}: ${label}]\n${chunk.content}`;
    })
    .join("\n\n---\n\n");

  return `${ragConfig.systemPrompt}

Context:
${contextBlock}

Question: ${question}

Answer using only the context above. When you use information from a source, mention which source it came from (e.g. "According to Source 2...").`;
}