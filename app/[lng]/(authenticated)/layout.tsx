import { redirect } from "next/navigation";
import { getAuth } from "@/lib/get-auth";
import { signOut } from "@/actions/auth-actions";
import Sidebar from "@/components/Sidebar";
import { useTranslation } from "@/app/i18n";

const Navbar: React.FC<{ username: string; lng: string }> = async ({
  username,
  lng,
}) => {
  const { t } = await useTranslation(lng, "basic");
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "1rem",
        position: "absolute",
        top: "1rem",
        right: "2rem",
      }}
    >
      <span style={{ marginRight: "1rem", fontSize: "1.5rem" }}>
        {t("welcome")}
        {username}
      </span>
      <form action={signOut}>
        <button
          style={{
            backgroundColor: "white",
            padding: "0.5rem 1rem",
            borderRadius: "1rem",
            textTransform: "uppercase",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {t("logout")}
        </button>
      </form>
    </nav>
  );
};

export default async function AuthenticatedLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  const { user } = await getAuth();

  if (!user) {
    redirect(`/${lng}/auth`);
  }

  return (
    <>
      <Navbar username={user.username} lng={lng} />
      <Sidebar lng={lng} />
      <section className="col note-viewer">{children}</section>
    </>
  );
}
