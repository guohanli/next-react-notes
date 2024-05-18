import AuthForm from "@/components/AuthForm";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: { mode: string };
}) {
  const modeParam = searchParams.mode;
  const mode = modeParam === "signup" ? "signup" : "login";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        gap: "1rem",
      }}
    >
      <AuthForm mode={mode} />
    </div>
  );
}
