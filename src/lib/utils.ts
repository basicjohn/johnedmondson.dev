import type { Locale, Post, ProjectKind } from "./types";
import { getDictionary } from "./i18n";

export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Project years are stored once, in English ("2025 – present"); the open
 * end is the only word in them, so it is the only thing to translate.
 */
export function formatYear(year: string, locale: Locale): string {
  return year.replace(/\bpresent\b/i, getDictionary(locale).post.present);
}

/** The card eyebrow's second half: "Contract", "Co-founder", … */
export function kindLabel(kind: ProjectKind, locale: Locale): string {
  return getDictionary(locale).post.kinds[kind];
}

/**
 * Name and subhead as one line ("Six Pillars — Cloud Optimization
 * Platform"), for the places a single string has to say what the project
 * is: the page title, link previews, structured data, cover alt text.
 */
export function fullTitle(post: Post, locale: Locale): string {
  const subtitle = post.subtitle?.[locale]?.trim();
  return subtitle ? `${post.title[locale]} — ${subtitle}` : post.title[locale];
}

/** Rough reading time in minutes from markdown source */
export function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

const UMLAUTS: Record<string, string> = { ä: "ae", ö: "oe", ü: "ue", ß: "ss" };

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[äöüß]/g, (c) => UMLAUTS[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Deterministic warm gradient for posts without a cover image */
export function coverGradient(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 360;
  }
  const h1 = (hash + 10) % 360;
  const h2 = (hash + 50) % 360;
  return `linear-gradient(135deg, hsl(${h1} 55% 72%), hsl(${h2} 60% 55%))`;
}
