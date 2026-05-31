"use client";

import { useEffect, useState } from "react";
import type { Note, CreateNoteBody } from "@/lib/types/note";
import { apiFetch } from "@/lib/api/client";
import { useToast } from "@/components/ui/toast-provider";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchNotes = async () => {
    try {
      const data = await apiFetch<Note[]>("/api/notes");
      setNotes(data);
    } catch {
      toast("Failed to load notes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNote = async (body: CreateNoteBody) => {
    try {
      const note = await apiFetch<Note>("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setNotes((prev) => [note, ...prev]);
      toast("Note saved successfully");
      return note;
    } catch {
      toast("Failed to save note", "error");
      return null;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await apiFetch(`/api/notes/${id}`, { method: "DELETE" });
      setNotes((prev) => prev.filter((n) => n.id !== id));
      toast("Note deleted");
    } catch {
      toast("Failed to delete note", "error");
    }
  };

  return { notes, loading, saveNote, deleteNote, refetch: fetchNotes };
}
