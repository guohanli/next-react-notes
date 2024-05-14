import React, { Suspense } from "react";
import Link from "next/link";
import SidebarSearchField from "@/components/SidebarSearchField";
import SidebarNoteList from "@/components/SidebarNoteList";
import EditButton from "@/components/EditButton";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import { useTranslation } from "@/app/i18n";
import FooterBase from "./Footer/FooterBase";

export default async function Sidebar({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng);
  return (
    <>
      <section className="col sidebar">
        <Link href={`/${lng}`} className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src={`/${lng}/logo.svg`}
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField lng={lng} />
          <EditButton lng={lng} noteId={null}>
            {t("new")}
          </EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
        <FooterBase />
      </section>
    </>
  );
}
