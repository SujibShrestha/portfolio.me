import type { RetrievedChunk } from "./types";

/**
 * Builds the user message for the LLM.
 *
 * The system prompt is sent separately (see `generateAnswerStream`), so it is
 * intentionally not repeated here. Context chunks are passed anonymously —
 * no "[Source N]" labels — so the model never has source numbering available
 * to parrot back in its answer.
 */
export function buildPrompt(question: string, chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) {
    return `No relevant context was found for this question.
Politely tell the user you don't have information about that, and don't guess.

Question: ${question}`;
  }

  const contextBlock = chunks
    .map((chunk) => chunk.content.trim())
    .filter(Boolean)
    .join("\n\n---\n\n");

  return `Context:
${contextBlock}

Question: ${question}

Answer the question directly using only the context above. Do not mention sources, citations, retrieval, or that a context was provided.`;
}
