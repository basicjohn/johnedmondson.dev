import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor } from "@/lib/seo";
import { WRITING_SECTION_PUBLIC } from "@/lib/config";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getFeaturedPosts, getPostsByType } from "@/lib/content";
import Hero from "@/components/organisms/Hero/Hero";
import SectionHeading from "@/components/molecules/SectionHeading/SectionHeading";
import ProjectCard from "@/components/molecules/ProjectCard/ProjectCard";
import PostCard from "@/components/molecules/PostCard/PostCard";
import styles from "./page.module.scss";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { alternates: alternatesFor(locale) };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const featuredWork = getFeaturedPosts("portfolio", 3);
  const recentWriting = getPostsByType("writing").slice(0, 3);

  return (
    <>
      <Hero
        locale={locale}
        role={dict.home.role}
        bio={dict.home.bio}
        ctaWork={dict.home.ctaWork}
        ctaContact={dict.home.ctaContact}
      />

      {featuredWork.length > 0 && (
        <section className={`container ${styles.section}`}>
          <SectionHeading
            title={dict.home.featuredWork}
            linkHref={`/${locale}/portfolio`}
            linkLabel={dict.home.viewAllWork}
          />
          <div className={styles.workGrid}>
            {featuredWork.map((post) => (
              <ProjectCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {WRITING_SECTION_PUBLIC && recentWriting.length > 0 && (
        <section className={`container ${styles.section}`}>
          <SectionHeading
            title={dict.home.recentWriting}
            linkHref={`/${locale}/writing`}
            linkLabel={dict.home.viewAllWriting}
          />
          <div className={styles.writingList}>
            {recentWriting.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                locale={locale}
                minReadLabel={dict.post.minRead}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
