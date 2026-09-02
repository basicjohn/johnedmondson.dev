export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** A string with a value per supported language */
export type Localized = Record<Locale, string>;

export type PostType = "portfolio" | "writing";
export type PostStatus = "draft" | "published";

export interface Post {
  id: string;
  slug: string;
  type: PostType;
  status: PostStatus;
  featured: boolean;
  /**
   * Manual position in portfolio listings and on the home page. Posts with
   * an order come first, ascending; the rest follow newest-first. Writing
   * ignores it — a blog is chronological.
   */
  order?: number;
  date: string; // ISO yyyy-mm-dd
  updated?: string;
  tags: string[];
  cover?: string; // optional image URL/path; cards fall back to a generated gradient
  coverCaption?: Localized; // one line under the cover on the project page
  title: Localized;
  excerpt: Localized;
  body: Localized; // markdown
  // Portfolio-specific (optional for writings)
  client?: string;
  role?: string;
  year?: string;
  link?: string;
  repo?: string;
  stack?: string[];
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteData {
  socials: SocialLink[];
  email: string;
  /** Path to the public résumé PDF; the footer link appears once this is set */
  resume?: string;
}

/** Blank post used by the CMS "new post" form */
export function emptyPost(type: PostType = "writing"): Post {
  return {
    id: "",
    slug: "",
    type,
    status: "draft",
    featured: false,
    date: new Date().toISOString().slice(0, 10),
    tags: [],
    title: { en: "", de: "" },
    excerpt: { en: "", de: "" },
    body: { en: "", de: "" },
  };
}
