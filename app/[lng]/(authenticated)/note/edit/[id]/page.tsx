import { useTranslation } from "@/app/i18n";
import NoteEditor from "@/components/NoteEditor";
import { getNote } from "@/lib/note";

interface Props {
  params: {
    id: string;
    lng: string;
  };
}

export default async function EditPage({ params: { id: noteId, lng } }: Props) {
  const note = await getNote(noteId);
  const { t } = await useTranslation(lng, "basic");

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">{t("initText")}</span>
      </div>
    );
  }

  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={note.title}
      initialBody={note.content!}
    />
  );
}
