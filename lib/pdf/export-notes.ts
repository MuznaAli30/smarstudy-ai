import type { Note } from "@/lib/types/note";
import { noteTypeLabel } from "@/lib/types/note";

export async function exportNotesToPDF(notes: Note[]) {
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const addPageIfNeeded = (needed: number) => {
    if (y + needed > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Title page
  doc.setFontSize(24);
  doc.setTextColor(99, 102, 241);
  doc.text("SmartStudy AI — Study Notes", margin, y);
  y += 12;

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, y);
  y += 16;

  const grouped = {
    explanation: notes.filter((n) => n.type === "explanation"),
    quiz: notes.filter((n) => n.type === "quiz"),
    plan: notes.filter((n) => n.type === "plan"),
  };

  const sections: { key: keyof typeof grouped; heading: string }[] = [
    { key: "explanation", heading: "AI Explanations" },
    { key: "quiz", heading: "Quizzes" },
    { key: "plan", heading: "Study Plans" },
  ];

  for (const section of sections) {
    const items = grouped[section.key];
    if (items.length === 0) continue;

    addPageIfNeeded(20);
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text(section.heading, margin, y);
    y += 10;

    for (const note of items) {
      addPageIfNeeded(30);

      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text(note.title, margin, y);
      y += 6;

      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(
        `${noteTypeLabel(note.type)} · ${new Date(note.createdAt).toLocaleString()}`,
        margin,
        y
      );
      y += 8;

      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(note.content, maxWidth);
      for (const line of lines) {
        addPageIfNeeded(6);
        doc.text(line, margin, y);
        y += 5;
      }
      y += 8;
    }
    y += 6;
  }

  if (notes.length === 0) {
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139);
    doc.text("No notes to export.", margin, y);
  }

  doc.save(`smartstudy-notes-${Date.now()}.pdf`);
}
