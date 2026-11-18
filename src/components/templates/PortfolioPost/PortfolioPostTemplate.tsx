import Link from "next/link";
import type { Locale, Post } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { extractHeadings, markdownToHtml } from "@/lib/markdown";
import { formatYear, fullTitle, kindLabel } from "@/lib/utils";
import { tagLabel } from "@/lib/tags";
import { SIZES } from "@/lib/images";
import CoverMedia from "@/components/atoms/CoverMedia/CoverMedia";
import TableOfContents from "@/components/molecules/TableOfContents/TableOfContents";
import Tag from "@/components/atoms/Tag/Tag";
import Badge from "@/components/atoms/Badge/Badge";
import Button from "@/components/atoms/Button/Button";
import SectionHeading from "@/components/molecules/SectionHeading/SectionHeading";
import ProjectCard from "@/components/molecules/ProjectCard/ProjectCard";
import styles from "./PortfolioPostTemplate.module.scss";

type Props = {
  post: Post;
  related: Post[];
  /** Neighbours in the portfolio's curated order */
  prev?: Post;
  next?: Post;
  locale: Locale;
  dict: Dictionary;
};

/**
 * A project, light to dark like every page: the name and facts on the
 * drafting grid, the cover overlapping onto an off-white sheet where the
 * case study is read (long text reads best on light), then the
 * neighbouring and related projects on the dark ground above the footer.
 */
export default function PortfolioPostTemplate({
  post,
  related,
  prev,
  next,
  locale,
  dict,
}: Props) {
  const html = markdownToHtml(post.body[locale]);
  const headings = extractHeadings(post.body[locale]).filter(
    (h) => h.level === 2,
  );
  const subtitle = post.subtitle?.[locale];
  const stack = post.stack ?? [];

  const facts: { label: string; value: string }[] = [];
  if (post.client) facts.push({ label: dict.post.client, value: post.client });
  if (post.role) facts.push({ label: dict.post.role, value: post.role });
  if (post.year)
    facts.push({ label: dict.post.year, value: formatYear(post.year, locale) });

  // Three headings is the floor for the outline: below that it is longer
  // than the scroll it saves.
  const showToc = headings.length >= 3;
  const showAside = stack.length > 0 || showToc || post.link || post.repo;

  return (
    <article>
      <header
        className={`${styles.intro} ${post.cover ? styles.introWithCover : ""}`}
      >
        <div className="container">
          <Link className={styles.back} href={`/${locale}/portfolio`}>
            ← {dict.post.backToPortfolio}
          </Link>
          {post.status === "draft" && (
            <p className={styles.draftNotice}>
              <Badge label={dict.common.draft} tone="draft" />{" "}
              {dict.post.draftNotice}
            </p>
          )}
          {post.kind && (
            <p className={styles.kind}>{kindLabel(post.kind, locale)}</p>
          )}
          <h1 className={styles.title}>{post.title[locale]}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <p className={styles.lede}>{post.excerpt[locale]}</p>

          {/* Client, role, year: a ruled strip. A named region rather than
              an <aside>: a complementary landmark nested in the article is
              flagged by every audit tool. */}
          {facts.length > 0 && (
            <section className={styles.facts} aria-label={dict.post.facts}>
              <dl>
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </header>

      <div className={styles.sheet}>
        {post.cover && (
          <div className="container">
            {/* Pulled up across the seam, half on the grid and half on the
                sheet, at its natural aspect ratio: a screenshot is never
                cropped. */}
            <figure className={styles.figure}>
              <div className={styles.frame}>
                <CoverMedia
                  className={styles.cover}
                  cover={post.cover}
                  video={post.coverVideo}
                  alt={post.coverCaption ? "" : fullTitle(post, locale)}
                  sizes={SIZES.feature}
                  loading="eager"
                />
              </div>
              {post.coverCaption && (
                <figcaption className={styles.caption}>
                  {post.coverCaption[locale]}
                </figcaption>
              )}
            </figure>
          </div>
        )}

        <div className={`container ${styles.bodyGrid}`}>
          {/* Before the case study in reading order, so a phone sees the
              stack first; beside it, pinned, from desktop width. */}
          {showAside && (
            <div className={styles.aside}>
              {stack.length > 0 && (
                <div>
                  <h2 className={styles.asideHeading}>{dict.post.stack}</h2>
                  <ul className={styles.tags}>
                    {stack.map((item) => (
                      <li key={item}>
                        <Tag label={tagLabel(item, locale)} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {showToc && (
                <TableOfContents
                  label={dict.post.onThisPage}
                  headings={headings}
                />
              )}
              {(post.link || post.repo) && (
                <div className={styles.links}>
                  {post.link && (
                    <Button variant="secondary" href={post.link} external>
                      {dict.post.visitSite} <span aria-hidden="true">↗</span>
                    </Button>
                  )}
                  {post.repo && (
                    <Button variant="secondary" href={post.repo} external>
                      {dict.post.viewCode} <span aria-hidden="true">↗</span>
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          <div
            className={`prose ${styles.body}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      {(prev || next || related.length > 0) && (
        <div className={`inverse ${styles.dark}`}>
          {(prev || next) && (
            <nav
              className={`container ${styles.pager}`}
              aria-label={dict.post.pagerLabel}
            >
              {prev ? (
                <Link
                  className={styles.pagerLink}
                  href={`/${locale}/portfolio/${prev.slug}`}
                >
                  <span className={styles.pagerDirection}>
                    ← {dict.post.prevProject}
                  </span>
                  <span className={styles.pagerTitle}>
                    <span>{prev.title[locale]}</span>
                  </span>
                  {prev.subtitle?.[locale] && (
                    <span className={styles.pagerSubtitle}>
                      {prev.subtitle[locale]}
                    </span>
                  )}
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
              {next ? (
                <Link
                  className={`${styles.pagerLink} ${styles.pagerNext}`}
                  href={`/${locale}/portfolio/${next.slug}`}
                >
                  <span className={styles.pagerDirection}>
                    {dict.post.nextProject} →
                  </span>
                  <span className={styles.pagerTitle}>
                    <span>{next.title[locale]}</span>
                  </span>
                  {next.subtitle?.[locale] && (
                    <span className={styles.pagerSubtitle}>
                      {next.subtitle[locale]}
                    </span>
                  )}
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
            </nav>
          )}

          {related.length > 0 && (
            <section
              className={`container ${styles.related}`}
              aria-labelledby="related-heading"
            >
              <SectionHeading
                id="related-heading"
                title={dict.post.relatedProjects}
              />
              <div className={styles.relatedGrid}>
                {related.map((p, i) => (
                  <ProjectCard
                    key={p.id}
                    post={p}
                    locale={locale}
                    variant="compact"
                    index={i}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </article>
  );
}
