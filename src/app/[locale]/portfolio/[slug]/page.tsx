import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { getPostBySlug, getPostsByType, getRelatedPosts } from "@/lib/content";
import { alternatesFor } from "@/lib/seo";
import PortfolioPostTemplate from "@/components/templates/PortfolioPost/PortfolioPostTemplate";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPostsByType("portfolio").map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    alternates: alternatesFor(locale, `/portfolio/${post.slug}`),
  };
}

export default async function PortfolioPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = getPostBySlug(slug);
  if (!post || post.type !== "portfolio") notFound();
  // Drafts are previewable in dev only
  if (post.status === "draft" && process.env.NODE_ENV === "production")
    notFound();

  const dict = getDictionary(locale);
  const related = getRelatedPosts(post);

  // Neighbours in the same newest-first order the index uses. Drafts are
  // already excluded, so the links can never point at an unpublished page.
  const ordered = getPostsByType("portfolio");
  const index = ordered.findIndex((p) => p.id === post.id);
  const prev = index > 0 ? ordered[index - 1] : undefined;
  const next =
    index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined;

  return (
    <PortfolioPostTemplate
      post={post}
      related={related}
      prev={prev}
      next={next}
      locale={locale}
      dict={dict}
    />
  );
}
