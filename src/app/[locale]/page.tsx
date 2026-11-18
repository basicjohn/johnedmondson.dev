import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor } from "@/lib/seo";
import { WRITING_SECTION_PUBLIC } from "@/lib/config";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getFeaturedPosts, getPostsByType, getSiteData } from "@/lib/content";
import Hero from "@/components/organisms/Hero/Hero";
import Now from "@/components/organisms/Now/Now";
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
  const site = getSiteData();
  // One lead project shown large, two beneath — see ProjectCard's `feature`
  // variant. getFeaturedPosts honours each post's `order`, so the lead is
  // chosen in the content, not here.
  const [lead, ...rest] = getFeaturedPosts("portfolio", 3);
  const recentWriting = getPostsByType("writing").slice(0, 3);

  return (
    <>
      <Hero
        locale={locale}
        role={dict.home.role}
        bioLead={dict.home.bioLead}
        bio={dict.home.bio}
        portraitAlt={dict.home.portraitAlt}
        ctaWork={dict.home.ctaWork}
        ctaContact={dict.home.ctaContact}
      />

      <Now
        locale={locale}
        heading={dict.home.nowHeading}
        updatedLabel={dict.home.nowUpdated}
        updated={site.nowUpdated}
        items={[
          {
            label: dict.home.nowWorkingLabel,
            text: dict.home.nowWorking,
            href: `/${locale}/portfolio/bold-reuse`,
          },
          {
            label: dict.home.nowBuildingLabel,
            text: dict.home.nowBuilding,
            href: `/${locale}/portfolio/top-shot-reloaded`,
          },
          {
            label: dict.home.nowLookingLabel,
            text: dict.home.nowLooking,
            href: `/${locale}/contact`,
          },
        ]}
      />

      {/* Below the ticker the page is reversed out of the dark ground:
          the work, then the person, numbered like a magazine's sections. */}
      <div className={`inverse ${styles.lower}`}>
        {lead && (
          <section
            className={`container ${styles.section}`}
            aria-labelledby="work-heading"
          >
            <SectionHeading
              id="work-heading"
              number="01"
              title={dict.home.featuredWork}
              linkHref={`/${locale}/portfolio`}
              linkLabel={dict.home.viewAllWork}
            />
            <ProjectCard post={lead} locale={locale} variant="feature" />
            <div className={styles.pair}>
              {rest.map((post, i) => (
                <ProjectCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

        {/* The two hero sentences that were about the person rather than
            the work. Below the projects, where personality belongs, so the
            hero can be scanned instead of read. */}
        <section
          className={`container ${styles.section}`}
          aria-labelledby="about-heading"
        >
          <SectionHeading
            id="about-heading"
            number="02"
            title={dict.home.aboutHeading}
          />
          <div className={styles.about}>
            <p className={styles.aboutWork} data-reveal="">
              <span className={styles.highlight}>{dict.home.aboutWork}</span>
            </p>
            <p className={styles.aboutLife} data-reveal="">
              {dict.home.aboutLife}
            </p>
          </div>
        </section>

        {WRITING_SECTION_PUBLIC && recentWriting.length > 0 && (
          <section
            className={`container ${styles.section}`}
            aria-labelledby="writing-heading"
          >
            <SectionHeading
              id="writing-heading"
              number="03"
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
      </div>
    </>
  );
}
