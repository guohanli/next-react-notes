// components/EditButton.js
import Link from "next/link";

interface Props {
  noteId: string | null;
  children: React.ReactNode;
  lng: string;
}

export default function EditButton({ noteId, children, lng }: Props) {
  const isDraft = noteId == null;
  return (
    <Link href={`/${lng}/note/edit/${noteId || ""}`} className="link--unstyled">
      <button
        className={[
          "edit-button",
          isDraft ? "edit-button--solid" : "edit-button--outline",
        ].join(" ")}
        role="menuitem"
      >
        {children}
      </button>
    </Link>
  );
}
