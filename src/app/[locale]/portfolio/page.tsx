import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor } from "@/lib/seo";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getPostsByType } from "@/lib/content";
import { hasDescender } from "@/lib/utils";
import PostGrid from "@/components/organisms/PostGrid/PostGrid";
import styles from "./page.module.scss";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.portfolio.title,
    description: dict.portfolio.intro,
    alternates: alternatesFor(locale, "/portfolio"),
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const posts = getPostsByType("portfolio");

  return (
    <>
      {/* The title and intro on the drafting grid, then every project on
          the dark ground. */}
      <header className={styles.intro}>
        <div className="container">
          <h1
            className={`${styles.title} ${hasDescender(dict.portfolio.title) ? styles.descends : ""}`}
          >
            {dict.portfolio.title}
          </h1>
          <p className={styles.lede}>{dict.portfolio.intro}</p>
        </div>
      </header>
      <section
        className={`inverse ${styles.dark}`}
        aria-label={dict.portfolio.title}
      >
        <div className="container">
          <PostGrid
            posts={posts}
            locale={locale}
            allLabel={dict.portfolio.filterAll}
            emptyLabel={dict.portfolio.empty}
          />
        </div>
      </section>
    </>
  );
}
