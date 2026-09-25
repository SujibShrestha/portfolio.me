// scripts/ingest-content.ts
import fg from "fast-glob";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { chunkDocument } from "../lib/rag/chunker";
import { embedText } from "@/lib/rag/embeddings"; 
import { replaceDocumentChunks } from "../lib/rag/vectorStores";
import type { Document, EmbeddedChunk } from "../lib/rag/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

async function loadDocuments(): Promise<Document[]> {
  const files = await fg("**/*.{md,mdx}", { cwd: CONTENT_DIR });

  const docs: Document[] = [];

  for (const file of files) {
    const fullPath = path.join(CONTENT_DIR, file);
    const raw = await fs.readFile(fullPath, "utf-8");
    const { data, content } = matter(raw); // data = frontmatter, content = body

    const type = file.startsWith("blog/")
      ? "blog"
      : file.startsWith("projects/")
      ? "project"
      : file.includes("resume")
      ? "resume"
      : "about";

    docs.push({
      id: file, // e.g. "blog/my-post.mdx"
      content,
      metadata: {
        title: data.title ?? file,
        type,
        url: data.slug ? `/${type}/${data.slug}` : undefined,
        tags: data.tags ?? [],
        updatedAt: data.date ?? undefined,
      },
    });
  }

  return docs;
}

async function main() {
  console.log("Loading documents...");
  const documents = await loadDocuments();
  console.log(`Loaded ${documents.length} documents.`);

  let totalChunks = 0;

  for (const doc of documents) {
    const chunks = chunkDocument(doc);
    console.log(`  ${doc.id} -> ${chunks.length} chunks`);

    const embeddedChunks: EmbeddedChunk[] = [];
    for (const chunk of chunks) {
      const embedding = await embedText(chunk.content);
      embeddedChunks.push({ ...chunk, embedding });
    }

    // Finish embedding before changing stored data so API failures leave it intact.
    await replaceDocumentChunks(doc.id, embeddedChunks);
    totalChunks += embeddedChunks.length;
  }

  console.log(`Done. Ingested ${totalChunks} chunks total.`);
}

main().catch((err) => {
  console.error("Ingestion failed:", err);
  process.exit(1);
});
