import { redirect } from "next/navigation";
import { getAuth } from "@/lib/get-auth";
import { signOut } from "@/actions/auth-actions";
import Sidebar from "@/components/Sidebar";

const Navbar: React.FC<{ username: string }> = ({ username }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "1rem",
        position: "absolute",
        top: "1rem",
        right: "2rem",
      }}
    >
      <span style={{ marginRight: "1rem" }}>{username}</span>
      <form action={signOut}>
        <button>Logout</button>
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
    redirect("/auth");
  }

  return (
    <>
      <Navbar username={user.username} />
      <Sidebar lng={lng} />
      <section className="col note-viewer">{children}</section>
    </>
  );
}
