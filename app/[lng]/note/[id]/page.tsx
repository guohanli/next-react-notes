import { useTranslation } from "@/app/i18n";
import Note from "@/components/Note";
import { getNote } from "@/lib/redis";
import { sleep } from "@/lib/utils";

interface Props {
  params: {
    lng: string;
    id: string;
  };
}

export default async function Page({ params: { id: noteId, lng } }: Props) {
  const note = await getNote(noteId);
  const { t } = await useTranslation(lng, "basic");

  // 为了让 Suspense 的效果更明显
  // await sleep(1000);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">{t("initText")}</span>
      </div>
    );
  }

  return <Note lng={lng} noteId={noteId} note={note} />;
}
