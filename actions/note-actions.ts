"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/lib/note";
import { revalidatePath } from "next/cache";
import { z, ZodIssue } from "zod";

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, "请填写内容").max(65535, "字数最多 65535"),
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
  };

  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    };
  }

  if (noteId) {
    updateNote(noteId, validated.data.title, validated.data.content);
    revalidatePath("/", "layout");
  } else {
    const res = await addNote(validated.data.title, validated.data.content);
    revalidatePath("/", "layout");
    redirect(`/note/${res}`);
  }

  const lng = formData.get("lng") as string;
  return { message: lng === "zh" ? "笔记已保存" : "Note saved" };
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

export async function importNote(formData: FormData) {
  const file = formData.get("file") as File;

  // 空值判断
  if (!file) {
    return { error: "File is required." };
  }

  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer());

  const title = file.name.replace(/\.[^/.]+$/, "");
  // 调用接口，写入数据库
  const res = await addNote(title, buffer.toString("utf-8"));

  // 清除缓存
  revalidatePath("/", "layout");

  return { uid: res };
}
