"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { generateId } from "lucia";
import { getAuth } from "@/lib/get-auth";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/utils/to-form-state";
import { z } from "zod";

export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const schema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

  const formDataRaw = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  // 验证表单数据
  try {
    schema.parse(formDataRaw);
  } catch (error) {
    return fromErrorToFormState(error);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: formDataRaw.username },
    });

    if (!user) {
      return toFormState("ERROR", "Incorrect username or password");
    }

    const validPassword = await new Argon2id().verify(
      user.hashedPassword,
      formDataRaw.password
    );

    if (!validPassword) {
      return toFormState("ERROR", "Incorrect username or password");
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return toFormState("SUCCESS", "Login successful");
  } catch (error) {
    return fromErrorToFormState(error);
  }
}

export async function signUp(prevState: FormState, formData: FormData) {
  const schema = z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  });

  const formDataRaw = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  // 验证表单数据
  try {
    schema.parse(formDataRaw);
  } catch (error) {
    return fromErrorToFormState(error);
  }

  // 检查密码是否匹配
  if (formDataRaw.password !== formDataRaw.confirmPassword) {
    return toFormState("ERROR", "Passwords do not match");
  }

  // 检查用户名是否已存在
  const user = await prisma.user.findUnique({
    where: { username: formDataRaw.username },
  });

  if (user) {
    return toFormState("ERROR", "Username already exists");
  }

  // 创建用户
  try {
    const hashedPassword = await new Argon2id().hash(formDataRaw.password);
    const userId = generateId(15);

    await prisma.user.create({
      data: {
        id: userId,
        username: formDataRaw.username,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return toFormState("SUCCESS", "User created successfully");
  } catch (error) {
    return fromErrorToFormState(error);
  }
}

export async function auth(
  mode: "login" | "signup",
  prevState: FormState,
  formData: FormData
) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signUp(prevState, formData);
}

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect("/auth");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect("/auth");
};
