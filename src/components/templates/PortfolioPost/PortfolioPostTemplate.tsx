import Link from "next/link";
import type { Locale, Post } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { markdownToHtml } from "@/lib/markdown";
import { coverGradient, formatDate } from "@/lib/utils";
import Tag from "@/components/atoms/Tag/Tag";
import Badge from "@/components/atoms/Badge/Badge";
import Button from "@/components/atoms/Button/Button";
import SectionHeading from "@/components/molecules/SectionHeading/SectionHeading";
import ProjectCard from "@/components/molecules/ProjectCard/ProjectCard";
import styles from "./PortfolioPostTemplate.module.scss";

type Props = {
  post: Post;
  related: Post[];
  /** Neighbours in the portfolio's newest-first order */
  prev?: Post;
  next?: Post;
  locale: Locale;
  dict: Dictionary;
};

export default function PortfolioPostTemplate({
  post,
  related,
  prev,
  next,
  locale,
  dict,
}: Props) {
  const html = markdownToHtml(post.body[locale]);

  const facts: { label: string; value: string }[] = [];
  if (post.client) facts.push({ label: dict.post.client, value: post.client });
  if (post.role) facts.push({ label: dict.post.role, value: post.role });
  if (post.year) facts.push({ label: dict.post.year, value: post.year });

  return (
    <article>
      <div className={styles.coverWrap}>
        {post.cover ? (
          <img
            className={styles.cover}
            src={post.cover}
            alt={post.title[locale]}
          />
        ) : (
          <div
            className={styles.cover}
            style={{ background: coverGradient(post.slug) }}
          />
        )}
      </div>

      <div className={`container ${styles.layout}`}>
        <header className={styles.header}>
          <Link className={styles.back} href={`/${locale}/portfolio`}>
            ← {dict.post.backToPortfolio}
          </Link>
          {post.status === "draft" && (
            <p className={styles.draftNotice}>
              <Badge label={dict.common.draft} tone="draft" />{" "}
              {dict.post.draftNotice}
            </p>
          )}
          <h1 className={styles.title}>{post.title[locale]}</h1>
          <p className={styles.excerpt}>{post.excerpt[locale]}</p>
        </header>

        <aside className={styles.facts}>
          {facts.length > 0 && (
            <dl className={styles.factList}>
              {facts.map((fact) => (
                <div key={fact.label} className={styles.fact}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
              <div className={styles.fact}>
                <dt>{dict.post.publishedOn}</dt>
                <dd>{formatDate(post.date, locale)}</dd>
              </div>
            </dl>
          )}
          {post.stack && post.stack.length > 0 && (
            <div className={styles.stack}>
              <h2 className={styles.factsHeading}>{dict.post.stack}</h2>
              <ul className={styles.tags}>
                {post.stack.map((item) => (
                  <li key={item}>
                    <Tag label={item} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={styles.links}>
            {post.link && (
              <Button href={post.link} external>
                {dict.post.visitSite}
              </Button>
            )}
            {post.repo && (
              <Button variant="secondary" href={post.repo} external>
                {dict.post.viewCode}
              </Button>
            )}
          </div>
        </aside>

        <div
          className={`prose ${styles.body}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

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
              <span className={styles.pagerTitle}>{prev.title[locale]}</span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next ? (
            <Link
              className={`${styles.pagerLink} ${styles.pagerLinkNext}`}
              href={`/${locale}/portfolio/${next.slug}`}
            >
              <span className={styles.pagerDirection}>
                {dict.post.nextProject} →
              </span>
              <span className={styles.pagerTitle}>{next.title[locale]}</span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </nav>
      )}

      {related.length > 0 && (
        <section className={`container ${styles.related}`}>
          <SectionHeading title={dict.post.related} />
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <ProjectCard key={p.id} post={p} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
