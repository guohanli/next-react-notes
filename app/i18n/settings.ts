export const fallbackLng = "en";
export const languages = ["zh", "en", "ja"];
export const defaultNS = "basic";
export const cookieName = "i18next";

// 让默认语言始终在第一位，因为accept-language库会以第一个语言为默认语言
languages.splice(languages.indexOf(fallbackLng), 1);
languages.unshift(fallbackLng);

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS
) {
  return {
    // debug: true,
    supportedLngs: languages,
    // preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
