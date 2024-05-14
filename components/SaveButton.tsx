import { useTranslation } from "@/app/i18n/client";
import { useParams } from "next/navigation";
import { useFormStatus } from "react-dom";

interface Props {
  formAction: (formData: FormData) => void;
}
export default function EditButton({ formAction }: Props) {
  const { pending } = useFormStatus();
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation(lng, "note");

  return (
    <button
      className="note-editor-done"
      type="submit"
      formAction={formAction}
      disabled={pending}
      role="menuitem"
    >
      <img
        src="/checkmark.svg"
        width="14px"
        height="10px"
        alt=""
        role="presentation"
      />
      {pending ? t("saving") : t("done")}
    </button>
  );
}
