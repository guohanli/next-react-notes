"use client";

import React, { ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { importNote } from "@/actions/note-actions";
import { useTranslation } from "@/app/i18n/client";

export default function SidebarImport() {
  const router = useRouter();
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation(lng, "basic");

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await importNote(formData);
      router.push(`/note/${data.uid}`);
    } catch (error) {
      console.error("something went wrong");
    }

    // 重置 file input
    e.target.type = "file";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <label htmlFor="file" style={{ cursor: "pointer" }}>
        {t("importMd")}
      </label>
      <input
        type="file"
        id="file"
        name="file"
        style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
        onChange={onChange}
        accept=".md"
      />
    </div>
  );
}
