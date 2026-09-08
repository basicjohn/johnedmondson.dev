import type { Metadata } from "next";
import { locales, type Locale } from "./types";

export const SITE_URL = "https://www.johnedmondson.dev";

/** The portrait card every page falls back to when it has no image of its own */
export const DEFAULT_OG_IMAGE = {
  url: "/preview-image.jpg",
  width: 1200,
  height: 1181,
  alt: "John Edmondson",
};

/**
 * A complete Open Graph block for one page.
 *
 * Next does not merge nested metadata: a segment that sets `openGraph`
 * replaces the parent's whole object, images included. So every segment
 * that touches it has to supply the full set, and this is that set. Title
 * and description are left out on purpose — Next fills them from the page's
 * own title and description, which is what a layout wants.
 *
 * `image` is a project or post cover; without one the portrait card is used.
 */
export function openGraphFor(
  locale: Locale,
  path: string = "",
  opts: {
    image?: string;
    imageAlt?: string;
    type?: "website" | "article";
  } = {},
): Metadata["openGraph"] {
  return {
    type: opts.type ?? "website",
    siteName: "John Edmondson",
    url: `/${locale}${path}`,
    locale: locale === "de" ? "de_DE" : "en_US",
    alternateLocale: locales
      .filter((l) => l !== locale)
      .map((l) => (l === "de" ? "de_DE" : "en_US")),
    images: [
      opts.image
        ? { url: opts.image, alt: opts.imageAlt ?? "" }
        : DEFAULT_OG_IMAGE,
    ],
  };
}

/** The matching Twitter card; same replace-not-merge rule applies */
export function twitterFor(image?: string): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    images: [image ?? DEFAULT_OG_IMAGE.url],
  };
}

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
