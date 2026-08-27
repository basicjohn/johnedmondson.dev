import en from "@/dictionaries/en.json";
import de from "@/dictionaries/de.json";
import { locales, type Locale } from "./types";

export { locales };
export type { Locale };

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
