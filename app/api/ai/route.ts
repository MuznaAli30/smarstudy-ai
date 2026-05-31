import { NextResponse } from "next/server";
import { buildAIPrompt, isAIRequestType } from "@/lib/ai/prompts";
import { generateAICompletion } from "@/services/ai/openrouter.service";
import { aiRequestService } from "@/services/ai/ai-request.service";

export async function POST(req: Request) {
  try {
    const { type, text } = await req.json();

    if (!type || !text) {
      return NextResponse.json(
        { error: "type and text are required" },
        { status: 400 }
      );
    }

    if (!isAIRequestType(type)) {
      return NextResponse.json({ error: "Invalid AI type" }, { status: 400 });
    }

    const prompt = buildAIPrompt(type, text);
    const result = await generateAICompletion(prompt);

    await aiRequestService.create({ type, input: text, output: result });

    return NextResponse.json({ result });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate AI response" },
      { status: 500 }
    );
  }
}
