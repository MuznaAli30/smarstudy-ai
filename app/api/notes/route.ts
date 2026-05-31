import { NextResponse } from "next/server";
import { noteService } from "@/services/notes/note.service";
import { isNoteType } from "@/lib/types/note";

export async function GET() {
  try {
    const notes = await noteService.findAll();
    return NextResponse.json(notes);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, type } = body;

    if (!title || !content || !type) {
      return NextResponse.json(
        { error: "title, content, and type are required" },
        { status: 400 }
      );
    }

    if (!isNoteType(type)) {
      return NextResponse.json({ error: "Invalid note type" }, { status: 400 });
    }

    const note = await noteService.create({ title, content, type });
    return NextResponse.json(note, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
