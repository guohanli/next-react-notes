// app/[lng]/layout.js
import { languages } from "@/app/i18n/settings";
import "./style.css";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  children: React.ReactNode;
  params: { lng: string };
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata(
  { params: { lng } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const lngTitle = {
    en: "Next React Notes",
    zh: "Next React 笔记",
    ja: "Next React ノート",
  };

  const lngDesc = {
    en: "A simple note-taking app built with Next.js and React",
    zh: "一个使用 Next.js 和 React 构建的简单笔记应用",
    ja: "Next.js と React で構築されたシンプルなメモアプリ",
  };

  return {
    title: lngTitle[lng as keyof typeof lngTitle],
    description: lngDesc[lng as keyof typeof lngDesc],
  };
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
