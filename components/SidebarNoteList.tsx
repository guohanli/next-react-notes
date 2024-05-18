import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";
import { getAllNotes } from "@/lib/note";
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader";

export default async function NoteList() {
  const notes = await getAllNotes();

  if (notes.length == 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <SidebarNoteListFilter
      notes={notes.map((note) => {
        return {
          note: note,
          header: (
            <SidebarNoteItemHeader
              title={note.title}
              updateTime={note.updatedAt.toISOString()}
            />
          ),
        };
      })}
    />
  );
}
