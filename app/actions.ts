"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { z, ZodIssue } from "zod";

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, "请填写内容").max(100, "字数最多 100"),
});

export interface State {
  message?: string | null;
  errors?: ZodIssue[];
}

export async function saveNote(
  prevState: State,
  formData: FormData
): Promise<State> {
  const noteId = formData.get("noteId") as string;
  const data = {
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date(),
  };

  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    };
  }

  if (noteId) {
    updateNote(noteId, JSON.stringify(data));
    revalidatePath("/", "layout");
  } else {
    const res = await addNote(JSON.stringify(data));
    revalidatePath("/", "layout");
  }
  return { message: "Note saved" };
}

export async function deleteNote(
  prevState: void,
  formData: FormData
): Promise<void> {
  const noteId = formData.get("noteId") as string;
  delNote(noteId);
  revalidatePath("/", "layout");
  redirect("/");
}
