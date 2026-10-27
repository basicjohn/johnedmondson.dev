// What the live 404 (src/components/organisms/NotFound) renders, gathered
// for the Broadsheet version. The lab shows it at a preview route; once
// promoted it replaces NotFoundBody / NotFoundPage, which take the locale
// from the path the visitor tried.
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { getShellData } from "../_shared/homeData";

export function getNotFoundPage(locale: Locale) {
  const dict = getDictionary(locale);
  const shell = getShellData(locale, "broadsheet", {
    en: "/lab/en/broadsheet/not-found-preview",
    de: "/lab/de/broadsheet/not-found-preview",
  });
  return {
    shell,
    labels: {
      ...dict.notFound,
      projects: dict.nav.portfolio,
      contact: dict.nav.contact,
    },
    links: shell.links,
  };
}

export type NotFoundPageData = ReturnType<typeof getNotFoundPage>;
