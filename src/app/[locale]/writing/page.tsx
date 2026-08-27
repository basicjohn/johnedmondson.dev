import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor } from "@/lib/seo";
import { WRITING_SECTION_PUBLIC } from "@/lib/config";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getPostsByType } from "@/lib/content";
import PostList from "@/components/organisms/PostList/PostList";
import styles from "./page.module.scss";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.writing.title,
    description: dict.writing.intro,
    robots: WRITING_SECTION_PUBLIC ? undefined : { index: false, follow: true },
    alternates: alternatesFor(locale, "/writing"),
  };
}

export default async function WritingPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const posts = getPostsByType("writing");

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{dict.writing.title}</h1>
        <p className={styles.intro}>{dict.writing.intro}</p>
      </header>
      <PostList
        posts={posts}
        locale={locale}
        allLabel={dict.writing.filterAll}
        emptyLabel={dict.writing.empty}
        minReadLabel={dict.post.minRead}
      />
    </div>
  );
}
