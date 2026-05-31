import { NextResponse } from "next/server";
import { aiRequestService } from "@/services/ai/ai-request.service";

export async function GET() {
  try {
    const history = await aiRequestService.findAll();
    return NextResponse.json(history);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await aiRequestService.deleteAll();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to clear history" },
      { status: 500 }
    );
  }
}
