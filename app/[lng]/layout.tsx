// app/[lng]/layout.js
import { languages } from "@/app/i18n/settings";
import "./style.css";
import Sidebar from "@/components/Sidebar";

interface Props {
  children: React.ReactNode;
  params: { lng: string };
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({ children, params: { lng } }: Props) {
  return (
    <html lang={lng}>
      <body>
        <div className="container">
          <div className="main">{children}</div>
        </div>
      </body>
    </html>
  );
}
