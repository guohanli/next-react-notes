import SidebarNoteItemContent from "@/components/SidebarNoteItemContent";
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader";
import { Note } from "@prisma/client";

interface Props {
  note: Note;
}

export default function SidebarNoteItem({ note }: Props) {
  const { id: noteId, title, content = "", updatedAt: updateTime } = note;
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content?.substring(0, 50) || <i>(No content)</i>}
        </p>
      }
    >
      <SidebarNoteItemHeader
        title={title}
        updateTime={updateTime.toISOString()}
      />
    </SidebarNoteItemContent>
  );
}
