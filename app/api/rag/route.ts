import { generateAnswerStream } from "@/lib/rag/generate";
import { buildPrompt } from "@/lib/rag/promptTemplate";
import { retrieveRelevantChunks } from "@/lib/rag/retriever";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
  return  NextResponse.json({ message: "Hello from the RAG API!" },{status: 200});
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;
    
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const chunks = await retrieveRelevantChunks(query)
    const prompt = buildPrompt(query,chunks)
    const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const text of generateAnswerStream(prompt)) {
          controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        console.error("Stream error:", err);
        controller.enqueue(encoder.encode("\n[Error generating response]"));
      } finally {
        controller.close();
      }
    },
  });
     return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });

}catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}