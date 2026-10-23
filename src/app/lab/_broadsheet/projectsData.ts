// What the live projects pages render (src/app/[locale]/portfolio/…),
// gathered for the Broadsheet versions in the lab: the same posts, labels
// and order, with every project link kept inside the lab.
import { getDictionary } from "@/lib/i18n";
import { getPostBySlug, getPostsByType, getRelatedPosts } from "@/lib/content";
import { extractHeadings, markdownToHtml } from "@/lib/markdown";
import { formatYear, fullTitle, kindLabel } from "@/lib/utils";
import { tagLabel } from "@/lib/tags";
import type { Locale, Post } from "@/lib/types";
import { getShellData, projectsHref, toProject } from "../_shared/homeData";

const localePaths = (path: string): Record<Locale, string> => ({
  en: `/lab/en/broadsheet${path}`,
  de: `/lab/de/broadsheet${path}`,
});

export function getProjectsIndex(locale: Locale) {
  const dict = getDictionary(locale);
  const base = projectsHref(locale, "broadsheet");
  return {
    shell: getShellData(locale, "broadsheet", localePaths("/projects")),
    title: dict.portfolio.title,
    intro: dict.portfolio.intro,
    empty: dict.portfolio.empty,
    projects: getPostsByType("portfolio").map((p) =>
      toProject(p, locale, base),
    ),
  };
}

export type ProjectsIndexData = ReturnType<typeof getProjectsIndex>;

export function getProjectPage(locale: Locale, slug: string) {
  const post = getPostBySlug(slug);
  if (!post || post.type !== "portfolio") return undefined;

  const dict = getDictionary(locale);
  const base = projectsHref(locale, "broadsheet");

  // Neighbours in the same curated order the index uses; drafts are already
  // excluded, so the links never point at an unpublished page.
  const ordered = getPostsByType("portfolio");
  const index = ordered.findIndex((p) => p.id === post.id);
  const neighbour = (p?: Post) =>
    p && {
      href: `${base}/${p.slug}`,
      title: p.title[locale],
      subtitle: p.subtitle?.[locale],
    };

  const facts: { label: string; value: string }[] = [];
  if (post.client) facts.push({ label: dict.post.client, value: post.client });
  if (post.role) facts.push({ label: dict.post.role, value: post.role });
  if (post.year)
    facts.push({ label: dict.post.year, value: formatYear(post.year, locale) });

  return {
    shell: getShellData(locale, "broadsheet", localePaths(`/projects/${slug}`)),
    labels: dict.post,
    draftLabel: dict.common.draft,
    backHref: base,
    draft: post.status === "draft",
    kind: post.kind ? kindLabel(post.kind, locale) : undefined,
    title: post.title[locale],
    subtitle: post.subtitle?.[locale],
    excerpt: post.excerpt[locale],
    cover: post.cover,
    coverVideo: post.coverVideo,
    coverCaption: post.coverCaption?.[locale],
    coverAlt: fullTitle(post, locale),
    facts,
    stack: (post.stack ?? []).map((item) => tagLabel(item, locale)),
    link: post.link,
    repo: post.repo,
    html: markdownToHtml(post.body[locale]),
    headings: extractHeadings(post.body[locale]).filter((h) => h.level === 2),
    prev: index > 0 ? neighbour(ordered[index - 1]) : undefined,
    next:
      index >= 0 && index < ordered.length - 1
        ? neighbour(ordered[index + 1])
        : undefined,
    related: getRelatedPosts(post).map((p) => toProject(p, locale, base)),
  };
}

export type ProjectPageData = NonNullable<ReturnType<typeof getProjectPage>>;
