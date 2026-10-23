// Everything the live home page (src/app/[locale]/page.tsx) renders, gathered
// in one place so each lab variant shows exactly the same content — only the
// presentation differs. If the home page gains or loses a field, change it
// here too.
import { getDictionary } from "@/lib/i18n";
import { getFeaturedPosts, getSiteData } from "@/lib/content";
import { formatYear, kindLabel } from "@/lib/utils";
import { tagLabel } from "@/lib/tags";
import type { Locale, Post } from "@/lib/types";

export const VARIANTS = ["signal", "broadsheet"] as const;
export type Variant = (typeof VARIANTS)[number];

export type NowItem = { label: string; text: string; href: string };

export type Project = {
  id: string;
  href: string;
  eyebrow: string;
  title: string;
  /** "Cloud Optimization Platform": what the project is, under its name */
  subtitle?: string;
  summary: string;
  tags: string[];
  cover?: string;
  coverVideo?: string;
  /** First letter of the title, for the projects without a cover */
  initial: string;
};

/**
 * Where a variant's project links go. Broadsheet has its own projects pages
 * in the lab; the others link to the live ones.
 */
export function projectsHref(locale: Locale, variant: Variant): string {
  return variant === "broadsheet"
    ? `/lab/${locale}/broadsheet/projects`
    : `/${locale}/portfolio`;
}

export function toProject(post: Post, locale: Locale, base: string): Project {
  const title = post.title[locale];
  return {
    id: post.id,
    href: `${base}/${post.slug}`,
    eyebrow: [
      post.year && formatYear(post.year, locale),
      post.kind && kindLabel(post.kind, locale),
    ]
      .filter(Boolean)
      .join(" · "),
    title,
    subtitle: post.subtitle?.[locale],
    summary: post.summary?.[locale] || post.excerpt[locale],
    tags: post.tags.slice(0, 4).map((tag) => tagLabel(tag, locale)),
    cover: post.cover,
    coverVideo: post.coverVideo,
    initial: title.charAt(0),
  };
}

/**
 * What every page of a variant shares: the header's links and labels and
 * the footer. `localeHrefs` is where the language switch goes from this
 * particular page.
 */
export function getShellData(
  locale: Locale,
  variant: Variant,
  localeHrefs: Record<Locale, string>,
) {
  const dict = getDictionary(locale);
  const site = getSiteData();
  return {
    locale,
    nav: dict.nav,
    footer: dict.footer,
    common: dict.common,
    socials: site.socials,
    email: site.email,
    resume: site.resume,
    links: {
      // Home and (for Broadsheet) Projects stay inside the lab so the
      // variant can be clicked around; Contact goes to the real page.
      home: `/lab/${locale}/${variant}`,
      portfolio: projectsHref(locale, variant),
      contact: `/${locale}/contact`,
      locales: localeHrefs,
    },
  };
}

export type ShellData = ReturnType<typeof getShellData>;

export function getHomeData(locale: Locale, variant: Variant) {
  const dict = getDictionary(locale);
  const site = getSiteData();
  const base = projectsHref(locale, variant);
  const [lead, ...rest] = getFeaturedPosts("portfolio", 3);

  const updatedText = site.nowUpdated
    ? new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
        month: "long",
        year: "numeric",
      }).format(new Date(`${site.nowUpdated}T00:00:00`))
    : null;

  return {
    ...getShellData(locale, variant, {
      en: `/lab/en/${variant}`,
      de: `/lab/de/${variant}`,
    }),
    home: dict.home,
    now: {
      heading: dict.home.nowHeading,
      updatedLabel: dict.home.nowUpdated,
      updated: site.nowUpdated,
      updatedText,
      items: [
        {
          label: dict.home.nowWorkingLabel,
          text: dict.home.nowWorking,
          href: `${base}/bold-reuse`,
        },
        {
          label: dict.home.nowBuildingLabel,
          text: dict.home.nowBuilding,
          href: `${base}/top-shot-reloaded`,
        },
        {
          label: dict.home.nowLookingLabel,
          text: dict.home.nowLooking,
          href: `/${locale}/contact`,
        },
      ] satisfies NowItem[],
    },
    lead: lead ? toProject(lead, locale, base) : undefined,
    rest: rest.map((post) => toProject(post, locale, base)),
  };
}

export type HomeData = ReturnType<typeof getHomeData>;
