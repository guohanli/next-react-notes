import dayjs from "dayjs";
import NotePreview from "@/components/NotePreview";
import EditButton from "@/components/EditButton";
import { useTranslation } from "@/app/i18n";

interface Props {
  noteId: string;
  note: Note;
  lng: string;
}

export default async function Note({ noteId, note, lng }: Props) {
  const { title, content, updateTime } = note;
  const { t } = await useTranslation(lng, "note");

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            {t("lastUpdatedOn")}{" "}
            {dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}
          </small>
          <EditButton lng={lng} noteId={noteId}>{t("edit")}</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  );
}
