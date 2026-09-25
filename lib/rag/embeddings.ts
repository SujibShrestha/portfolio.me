import { ragConfig } from "./config";

const HF_API_URL = `https://router.huggingface.co/hf-inference/models/${ragConfig.embeddingModel}/pipeline/feature-extraction`;

export async function embedText(text: string): Promise<number[]> {
  if (!process.env.HF_ACCESS_TOKEN) {
    throw new Error("HF_ACCESS_TOKEN is not set. Add a Hugging Face token with Inference Providers permission to your environment.");
  }
  const res = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HF embedding request failed: ${res.status} ${errText}`);
  }

  const data = await res.json();

  // Accept a single vector or a batch containing one vector.
  const embedding = Array.isArray(data) && data.length === 1 && Array.isArray(data[0])
    ? data[0]
    : data;
  if (!Array.isArray(embedding) ||
      embedding.length !== ragConfig.embeddingDimensions ||
      !embedding.every((value: unknown) => typeof value === "number" && Number.isFinite(value))) {
    throw new Error(`Unexpected embedding response from HF API: expected ${ragConfig.embeddingDimensions} finite numbers`);
  }

  return embedding as number[];
}

// batch version — useful during ingestion to avoid one-by-one awaits
export async function embedTexts(texts: string[]): Promise<number[][]> {
  const embeddings: number[][] = [];
  for (const text of texts) {
    embeddings.push(await embedText(text));
    // small delay to be gentle on HF's free-tier rate limits
    await new Promise((r) => setTimeout(r, 200));
  }
  return embeddings;
}
