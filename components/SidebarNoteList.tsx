import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";
import { getAllNotes } from "@/lib/note";
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader";
import { useTranslation } from "@/app/i18n";

export default async function NoteList({ lng }: { lng: string }) {
  const notes = await getAllNotes();
  const { t } = await useTranslation(lng, "note");

  if (notes.length == 0) {
    return <div className="notes-empty">{t("noNotes")}</div>;
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
