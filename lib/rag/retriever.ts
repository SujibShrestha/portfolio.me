import { embedText } from "./embeddings";
import { queryChunks } from "./vectorStores";
import type { RetrievedChunk } from "./types";

export async function retrieveRelevantChunks(
  question: string
): Promise<RetrievedChunk[]> {
  const queryEmbedding = await embedText(question);
  const rows = await queryChunks(queryEmbedding);

  return rows.map((row: any) => ({
    id: `${row.source_doc_id}-chunk-${row.id}`,
    sourceDocId: row.source_doc_id,
    content: row.content,
    chunkIndex: row.id,
    metadata: row.metadata,
    embedding: [], // not needed downstream, omitted from DB response for bandwidth
    similarity: row.similarity,
  }));
}