// Everything the live home page (src/app/[locale]/page.tsx) renders, gathered
// in one place so each lab variant shows exactly the same content — only the
// presentation differs. If the home page gains or loses a field, change it
// here too.
import { getDictionary } from "@/lib/i18n";
import { getFeaturedPosts, getHomeIntro, getSiteData } from "@/lib/content";
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

/** Where a variant's Contact links go: Broadsheet's own page, or the live one */
export function contactHref(locale: Locale, variant: Variant): string {
  return variant === "broadsheet"
    ? `/lab/${locale}/broadsheet/contact`
    : `/${locale}/contact`;
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
    // The lab footers predate site.json and read the line off the labels
    footer: { ...dict.footer, availabilityText: site.availability[locale] },
    common: dict.common,
    socials: site.socials,
    email: site.email,
    resume: site.resume,
    links: {
      // Home stays inside the lab so the variant can be clicked around, and
      // so do Broadsheet's Projects and Contact; Signal's go to the real
      // pages.
      home: `/lab/${locale}/${variant}`,
      portfolio: projectsHref(locale, variant),
      contact: contactHref(locale, variant),
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

  const intro = getHomeIntro(site);
  const updatedText = site.now.updated
    ? new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
        month: "long",
        year: "numeric",
      }).format(new Date(`${site.now.updated}T00:00:00`))
    : null;

  return {
    ...getShellData(locale, variant, {
      en: `/lab/en/${variant}`,
      de: `/lab/de/${variant}`,
    }),
    // Same shape the lab pages were built against, filled from site.json
    home: {
      ...dict.home,
      role: intro.role[locale],
      bioLead: intro.lead[locale],
      bio: intro.bio[locale],
      aboutWork: site.home.about.work[locale],
      aboutLife: site.home.about.life[locale],
    },
    now: {
      heading: dict.home.nowHeading,
      updatedLabel: dict.home.nowUpdated,
      updated: site.now.updated,
      updatedText,
      // Links go to the live pages; an item without one points home
      items: site.now.items.map((item) => ({
        label: item.label[locale],
        text: item.text[locale],
        href: `/${locale}${item.href ?? ""}`,
      })) satisfies NowItem[],
    },
    lead: lead ? toProject(lead, locale, base) : undefined,
    rest: rest.map((post) => toProject(post, locale, base)),
  };
}

export type HomeData = ReturnType<typeof getHomeData>;
