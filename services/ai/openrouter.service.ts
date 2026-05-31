import {
  OPENROUTER_API_URL,
  OPENROUTER_APP_TITLE,
  OPENROUTER_HTTP_REFERER,
  OPENROUTER_MODEL,
} from "@/lib/constants/ai";

interface OpenRouterChoice {
  message?: { content?: string };
}

interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
}

export async function generateAICompletion(prompt: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": OPENROUTER_HTTP_REFERER,
      "X-Title": OPENROUTER_APP_TITLE,
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = (await response.json()) as OpenRouterResponse;

  return data?.choices?.[0]?.message?.content ?? "No response";
}
