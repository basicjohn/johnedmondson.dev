export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** A string with a value per supported language */
export type Localized = Record<Locale, string>;

export type PostType = "portfolio" | "writing";

/**
 * What kind of engagement a project was. Shown beside the year on cards so
 * a reader can tell paid client work from founder work from a side project
 * without opening each one. Labels live in the dictionaries under
 * `post.kinds`.
 */
export const projectKinds = [
  "contract",
  "founder",
  "employee",
  "personal",
] as const;
export type ProjectKind = (typeof projectKinds)[number];
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
  /**
   * A short, muted, looping MP4 shown in place of the cover where motion is
   * allowed; the cover is its poster and its fallback. For the projects
   * that move.
   */
  coverVideo?: string;
  coverCaption?: Localized; // one line under the cover on the project page
  title: Localized;
  /**
   * What the project is, in a few words ("Cloud Optimization Platform"),
   * shown as a subhead under the title on cards and the project page. Kept
   * out of the title itself, which is just the name. Portfolio only.
   */
  subtitle?: Localized;
  /**
   * One line for cards, 140 characters at most. The excerpt is the project
   * page's standfirst and the meta description; it runs to 250 characters,
   * which is five lines on a card.
   */
  summary?: Localized;
  excerpt: Localized;
  body: Localized; // markdown
  // Portfolio-specific (optional for writings)
  kind?: ProjectKind;
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
  /** ISO date the home page's "Currently" block was last true */
  nowUpdated?: string;
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
