
export interface Document {
  id: string;              // unique id for the source document (e.g. "blog/my-post.mdx")
  content: string;         // full raw text/markdown content
  metadata: DocumentMetadata;
}

export interface DocumentMetadata {
  title: string;
  type: "blog" | "project" | "resume" | "about";
  url?: string;             // link back to the live page, for citations
  tags?: string[];
  updatedAt?: string;
}

export interface Chunk {
  id: string;               // unique id for this chunk (e.g. `${sourceDocId}-chunk-0`)
  sourceDocId: string;      // Document.id this chunk was split from
  content: string;          // the chunked text itself
  chunkIndex: number;       // position of this chunk within the source doc
  metadata: DocumentMetadata; // usually inherited from parent Document
}

export interface EmbeddedChunk extends Chunk {
  embedding: number[];      // vector from embedText()
}

export interface RetrievedChunk extends EmbeddedChunk {
  similarity: number;       // cosine similarity score from the vector store query
}