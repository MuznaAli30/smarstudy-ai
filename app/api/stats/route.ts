import { NextResponse } from "next/server";
import { statsService } from "@/services/stats/stats.service";

export async function GET() {
  try {
    const stats = await statsService.getDashboardStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
