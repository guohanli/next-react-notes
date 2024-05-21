"use client";

import { useSearchParams } from "next/navigation";
import SidebarNoteItemContent from "@/components/SidebarNoteItemContent";
import { Note } from "@prisma/client";

export default function SidebarNoteList({
  notes,
}: {
  notes: {
    note: Note;
    header: React.ReactNode;
  }[];
}) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");
  return (
    <ul className="notes-list">
      {notes.map((noteItem) => {
        const { note, header } = noteItem;
        if (
          !searchText ||
          (searchText &&
            note.title.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return (
            <li key={note.id}>
              <SidebarNoteItemContent
                key={note.id}
                id={note.id}
                title={note.title}
                expandedChildren={
                  <p className="sidebar-note-excerpt">
                    {note.content?.substring(0, 50) || <i>(No content)</i>}
                  </p>
                }
              >
                {header}
              </SidebarNoteItemContent>
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
}
