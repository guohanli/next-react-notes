"use client";
import { auth } from "@/actions/auth-actions";
import { EMPTY_FORM_STATE } from "@/utils/to-form-state";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { FieldError } from "./FieldError";
import { useTranslation } from "@/app/i18n/client";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation(lng, "auth");
  const [formState, formAction] = useFormState(
    auth.bind(null, mode),
    EMPTY_FORM_STATE
  );

  useEffect(() => {
    if (formState.status === "SUCCESS") {
      redirect("/");
    }
  }, [formState]);

  return (
    <>
      <h2> {mode === "login" ? t("loginPage") : t("signupPage")}</h2>
      <form
        action={formAction}
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <input name="username" type="username" placeholder="Username" />
        <FieldError formState={formState} name="username" />
        <input name="password" type="password" placeholder="Password" />
        <FieldError formState={formState} name="password" />
        {mode === "signup" && (
          <>
            <input
              name="confirmPassword"
              type="password"
              placeholder="confirmPassword"
            />
            <FieldError formState={formState} name="confirmPassword" />
          </>
        )}

        {formState.message && <p>{formState.message}</p>}
        <button type="submit">
          {mode === "login" ? t("signin") : t("signup")}
        </button>
      </form>
      {mode === "login" && (
        <Link href={`/${lng}/auth?mode=signup`}>{t("createAnAccount")}</Link>
      )}
      {mode === "signup" && (
        <Link href={`/${lng}/auth?mode=login`}>
          {t("alreadyHaveAnAccount")}
        </Link>
      )}
    </>
  );
}
