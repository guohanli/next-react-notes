"use client";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "@/app/i18n/settings";
import { useParams, usePathname } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

export default function FooterBase() {
  const { lng } = useParams<{ lng: string }>();
  const { i18n } = useTranslation(lng, "footer");
  const { t } = i18n;
  let path = usePathname();

  return (
    <footer style={{ margin: "0 auto", width: "fit-content" }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        {/* @ts-expect-error Trans interpolation */}
        Switch from <strong>{{ lng }}</strong> to:{" "}
      </Trans>
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          const preLng = languages.find((l) => path.startsWith(`/${l}`));
          if (preLng) {
            path = path.replace(`/${preLng}`, `/${l}`);
          } else {
            path = `/${l}${path}`;
          }

          return (
            <span key={l}>
              {index > 0 && " or "}
              <Link href={path}>{l}</Link>
            </span>
          );
        })}
    </footer>
  );
}
