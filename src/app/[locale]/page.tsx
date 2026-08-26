import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getFeaturedPosts, getPostsByType, getSiteData } from "@/lib/content";
import Hero from "@/components/organisms/Hero/Hero";
import SkillTicker from "@/components/molecules/SkillTicker/SkillTicker";
import SectionHeading from "@/components/molecules/SectionHeading/SectionHeading";
import ProjectCard from "@/components/molecules/ProjectCard/ProjectCard";
import PostCard from "@/components/molecules/PostCard/PostCard";
import styles from "./page.module.scss";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const site = getSiteData();
  const featuredWork = getFeaturedPosts("portfolio", 3);
  const recentWriting = getPostsByType("writing").slice(0, 3);

  return (
    <>
      <Hero
        locale={locale}
        greetings={site.greetings}
        role={dict.home.role}
        bio={dict.home.bio}
        ctaWork={dict.home.ctaWork}
        ctaContact={dict.home.ctaContact}
      />

      <SkillTicker skills={site.skills} heading={dict.home.skillsHeading} />

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

      {recentWriting.length > 0 && (
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
