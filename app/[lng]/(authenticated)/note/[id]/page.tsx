import { useTranslation } from "@/app/i18n";
import NotePanel from "@/components/Note";
import { getNote } from "@/lib/note";

interface Props {
  params: {
    lng: string;
    id: string;
  };
}

export default async function Page({ params: { id: noteId, lng } }: Props) {
  const note = await getNote(noteId);
  const { t } = await useTranslation(lng, "basic");

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">{t("initText")}</span>
      </div>
    );
  }

  return <NotePanel lng={lng} note={note} />;
}
