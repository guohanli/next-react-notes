"use client";
import { auth } from "@/actions/auth-actions";
import { EMPTY_FORM_STATE } from "@/utils/to-form-state";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { FieldError } from "./FieldError";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
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
      <h2>Login Page</h2>
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
          {mode === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
      {mode === "login" && (
        <Link href="/auth?mode=signup">Create an account</Link>
      )}
      {mode === "signup" && (
        <Link href="/auth?mode=login">Already have an account?</Link>
      )}
    </>
  );
}
