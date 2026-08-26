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
  date: string; // ISO yyyy-mm-dd
  updated?: string;
  tags: string[];
  cover?: string; // optional image URL/path; cards fall back to a generated gradient
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

export interface Quote {
  text: string;
  author: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteData {
  skills: string[];
  greetings: string[];
  quotes: Quote[];
  socials: SocialLink[];
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
