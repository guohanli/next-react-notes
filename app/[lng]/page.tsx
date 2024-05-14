import { useTranslation } from "@/app/i18n";

interface Props {
  params: { lng: string };
}

export default async function Page({ params: { lng } }: Props) {
  const { t } = await useTranslation(lng, "basic");
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t("initText")}</span>
    </div>
  );
}
