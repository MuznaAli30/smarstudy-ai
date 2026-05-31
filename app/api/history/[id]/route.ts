import { NextResponse } from "next/server";
import { aiRequestService } from "@/services/ai/ai-request.service";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await aiRequestService.delete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete history item" },
      { status: 500 }
    );
  }
}
