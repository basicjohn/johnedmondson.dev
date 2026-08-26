import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { getPostBySlug, getPostsByType, getRelatedPosts } from "@/lib/content";
import WritingPostTemplate from "@/components/templates/WritingPost/WritingPostTemplate";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPostsByType("writing").map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title[locale], description: post.excerpt[locale] };
}

export default async function WritingPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = getPostBySlug(slug);
  if (!post || post.type !== "writing") notFound();
  // Drafts are previewable in dev only
  if (post.status === "draft" && process.env.NODE_ENV === "production") notFound();

  const dict = getDictionary(locale);
  const related = getRelatedPosts(post);

  return (
    <WritingPostTemplate post={post} related={related} locale={locale} dict={dict} />
  );
}
