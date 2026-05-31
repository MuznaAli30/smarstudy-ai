import { NextResponse } from "next/server";
import { taskService } from "@/services/tasks/task.service";

export async function GET() {
  try {
    const tasks = await taskService.findAll();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("[GET /api/tasks]", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = body?.title?.trim();

    if (!title) {
      return NextResponse.json(
        { error: "title is required" },
        { status: 400 }
      );
    }

    const task = await taskService.create(title);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("[POST /api/tasks]", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    if (!body?.id || typeof body.completed !== "boolean") {
      return NextResponse.json(
        { error: "id and completed are required" },
        { status: 400 }
      );
    }

    const updated = await taskService.updateCompleted(body.id, body.completed);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PATCH /api/tasks]", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    if (!body?.id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await taskService.delete(body.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/tasks]", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
