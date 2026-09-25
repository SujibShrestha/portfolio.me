import {neon } from "@neondatabase/serverless";
import { ragConfig } from "./config";
import type { EmbeddedChunk } from "./types";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Load your environment variables before importing the vector store (use npm run ingest for ingestion).");
}
const sql = neon(databaseUrl);

export async function replaceDocumentChunks(sourceDocId: string, chunks: EmbeddedChunk[]) {
  if (chunks.some((chunk) => chunk.sourceDocId !== sourceDocId)) {
    throw new Error("All chunks must belong to the document being replaced.");
  }

  // Serialize replacements for the same document, including concurrent ingestion runs.
  // Deletion and inserts commit together; a failure preserves the previous chunks.
  await sql.transaction([
    sql`SELECT pg_advisory_xact_lock(hashtext(${sourceDocId}))`,
    sql`DELETE FROM document_chunks WHERE source_doc_id = ${sourceDocId}`,
    ...chunks.map((chunk) => sql`
      INSERT INTO document_chunks (content, source_doc_id, metadata, embedding)
      VALUES (
        ${chunk.content},
        ${sourceDocId},
        ${JSON.stringify(chunk.metadata)},
        ${JSON.stringify(chunk.embedding)}
      )
    `),
  ], { isolationLevel: "ReadCommitted" });
}

export async function queryChunks(queryEmbedding: number[]) {
  const vector = JSON.stringify(queryEmbedding);
  const rows = await sql`
    SELECT id, source_doc_id, content, metadata,
      1 - (embedding <=> ${vector}::vector) AS similarity
    FROM document_chunks
    WHERE 1 - (embedding <=> ${vector}::vector) > ${ragConfig.similarityThreshold}
    ORDER BY embedding <=> ${vector}::vector
    LIMIT ${ragConfig.topK}
  `;
  return rows;
}
