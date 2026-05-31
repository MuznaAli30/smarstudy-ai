export type NoteType = "explanation" | "quiz" | "plan";

export interface Note {
  id: string;
  title: string;
  content: string;
  type: NoteType;
  createdAt: string;
}

export interface CreateNoteBody {
  title: string;
  content: string;
  type: NoteType;
}

export function isNoteType(type: string): type is NoteType {
  return type === "explanation" || type === "quiz" || type === "plan";
}

export function noteTypeLabel(type: NoteType): string {
  switch (type) {
    case "explanation":
      return "Explanation";
    case "quiz":
      return "Quiz";
    case "plan":
      return "Study Plan";
  }
}

export function aiTypeToNoteType(type: string): NoteType {
  if (type === "explain") return "explanation";
  if (type === "quiz") return "quiz";
  if (type === "plan") return "plan";
  return "explanation";
}
