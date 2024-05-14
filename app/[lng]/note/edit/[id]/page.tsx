import { useTranslation } from "@/app/i18n";
import NoteEditor from "@/components/NoteEditor";
import { getNote } from "@/lib/redis";
import { sleep } from "@/lib/utils";

interface Props {
  params: {
    id: string;
    lng: string;
  };
}

export default async function EditPage({ params: { id: noteId, lng } }: Props) {
  const note = await getNote(noteId);
  const { t } = await useTranslation(lng, "basic");

  // 让效果更明显;
  // await sleep(1000);

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
      initialBody={note.content}
    />
  );
}
