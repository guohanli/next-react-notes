import { prisma } from "@/lib/prisma";
import { getAuth } from "./get-auth";
import { Note } from "@prisma/client";

export async function getAllNotes(): Promise<Note[]> {
  const { user } = await getAuth();
  if (!user) {
    throw new Error("Unauthorized");
  }

  return await prisma.note.findMany({
    where: {
      authorId: user.id,
    },
  });
}

export async function addNote(title: string, content: string): Promise<string> {
  const { user } = await getAuth();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const res = await prisma.note.create({
    data: {
      title,
      content,
      authorId: user.id,
    },
  });
  return res.id;
}

export async function updateNote(id: string, title: string, content: string) {
  const { user } = await getAuth();
  if (!user) {
    throw new Error("Unauthorized");
  }

  await prisma.note.update({
    where: {
      id,
      authorId: user.id,
    },
    data: {
      title,
      content,
    },
  });
}

export async function getNote(noteId: string): Promise<Note> {
  const { user } = await getAuth();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  if (user.id !== note.authorId) {
    throw new Error("Forbidden");
  }

  return note;
}

export async function delNote(noteId: string) {
  const { user } = await getAuth();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  if (user.id !== note.authorId) {
    throw new Error("Forbidden");
  }

  await prisma.note.delete({
    where: {
      id: noteId,
    },
  });
}
