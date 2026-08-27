import type { Metadata } from "next";
import { locales, type Locale } from "./types";

/**
 * Self-canonical plus the full hreflang set for one page.
 *
 * These belong per-page, not on a layout. Declared once on [locale]/layout
 * they apply to every descendant, so /en/writing announces its canonical as
 * /en — which asks Google to index the section index instead of the page.
 *
 * `path` is everything after the locale segment, with a leading slash, or
 * "" for a locale home.
 */
export function alternatesFor(
  locale: Locale,
  path: string = "",
): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
  };
}
