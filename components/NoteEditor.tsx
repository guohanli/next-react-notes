"use client";

import { useEffect, useState } from "react";
import NotePreview from "@/components/NotePreview";
import { useFormState, useFormStatus } from "react-dom";
import { deleteNote, saveNote } from "../app/actions";
import DeleteButton from "./DeleteButton";
import SaveButton from "./SaveButton";
import type { State } from "../app/actions";

interface Props {
  noteId: string | null;
  initialTitle: string;
  initialBody: string;
}

const initialState: State = {
  message: null,
};

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody,
}: Props) {
  const [saveState, saveFormAction] = useFormState(saveNote, initialState);
  const [delState, delFormAction] = useFormState(deleteNote, undefined);

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isDraft = !noteId;

  useEffect(() => {
    if (saveState.errors) {
      // 处理错误
      console.log(saveState.errors);
    }
  }, [saveState]);

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <div className="note-editor-menu" role="menubar">
          <input type="hidden" name="noteId" value={noteId as string} />
          <SaveButton formAction={saveFormAction} />
          <DeleteButton isDraft={isDraft} formAction={delFormAction} />
        </div>
        <div className="note-editor-menu">
          {" "}
          {saveState.message}
          {saveState.errors && saveState.errors[0].message}
        </div>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          name="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          value={body}
          name="body"
          id="note-body-input"
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}
