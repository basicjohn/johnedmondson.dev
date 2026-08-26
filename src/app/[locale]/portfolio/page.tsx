import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor } from "@/lib/seo";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getPostsByType } from "@/lib/content";
import PostGrid from "@/components/organisms/PostGrid/PostGrid";
import styles from "./page.module.scss";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.portfolio.title, description: dict.portfolio.intro , alternates: alternatesFor(locale, "/portfolio") };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const posts = getPostsByType("portfolio");

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{dict.portfolio.title}</h1>
        <p className={styles.intro}>{dict.portfolio.intro}</p>
      </header>
      <PostGrid
        posts={posts}
        locale={locale}
        allLabel={dict.portfolio.filterAll}
        emptyLabel={dict.portfolio.empty}
      />
    </div>
  );
}
