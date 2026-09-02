import type { Locale } from "./types";

// Tags are stored in English and used as filter keys. Most are technical
// nouns that German readers use unchanged (Next.js, GraphQL, Dashboard,
// Frontend); the ones that are ordinary words get a German label here.
// Anything not listed displays as stored, so a new tag is never broken —
// just untranslated until it is added.
const LABELS: Record<Locale, Record<string, string>> = {
  en: {},
  de: {
    Architecture: "Architektur",
    "Data Visualization": "Datenvisualisierung",
    "Design System": "Designsystem",
    "Design Systems": "Designsysteme",
    Process: "Prozess",
    Security: "Sicherheit",
  },
};

export function tagLabel(tag: string, locale: Locale): string {
  return LABELS[locale]?.[tag] ?? tag;
}
