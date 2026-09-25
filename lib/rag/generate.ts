import { ChatGroq } from "@langchain/groq"
import { ragConfig } from "./config"

export async function* generateAnswerStream(prompt: string) {
  const llm = new ChatGroq({
    model: ragConfig.llmModel,
    temperature: ragConfig.temperature,
    maxTokens: ragConfig.maxTokens,
  });

  const stream = await llm.stream([
    { role: "system", content: ragConfig.systemPrompt },
    { role: "user", content: prompt },
  ]);

  for await (const chunk of stream) {
    if (typeof chunk.content === "string") {
      yield chunk.content;
    }
  }
}

