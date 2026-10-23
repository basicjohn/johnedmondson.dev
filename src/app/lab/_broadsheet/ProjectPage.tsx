import Link from "next/link";
import { SIZES } from "@/lib/images";
import CoverMedia from "@/components/atoms/CoverMedia/CoverMedia";
import BroadsheetShell from "./BroadsheetShell";
import ProjectCard from "./ProjectCard";
import Toc from "./Toc";
import type { ProjectPageData } from "./projectsData";
import styles from "./Broadsheet.module.scss";
import page from "./Projects.module.scss";

/**
 * A project as the Broadsheet sets it, light to dark like the home page:
 * the name and facts on the drafting grid, the cover overlapping onto an
 * off-white sheet where the case study is read, then the neighbouring
 * and related projects on the dark ground above the footer.
 */
export default function ProjectPage({ data }: { data: ProjectPageData }) {
  const { labels } = data;

  return (
    <BroadsheetShell shell={data.shell} current="portfolio">
      <article>
        <header
          className={`${page.intro} ${data.cover ? page.introWithCover : ""}`}
        >
          <div className={`container ${page.introInner}`}>
            <Link className={page.back} href={data.backHref}>
              ← {labels.backToPortfolio}
            </Link>
            {data.draft && (
              <p className={page.draft}>
                <span>{data.draftLabel}</span> {labels.draftNotice}
              </p>
            )}
            {data.kind && <p className={styles.eyebrow}>{data.kind}</p>}
            <h1 className={page.projectTitle}>{data.title}</h1>
            {data.subtitle && (
              <p className={page.projectSubtitle}>{data.subtitle}</p>
            )}
            <p className={page.lede}>{data.excerpt}</p>

            {data.facts.length > 0 && (
              <section className={page.facts} aria-label={labels.facts}>
                <dl>
                  {data.facts.map((fact) => (
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

        <div className={page.sheet}>
          {data.cover && (
            <div className="container">
              {/* Pulled up across the seam, half on the grid, half on the
                  sheet. Natural aspect ratio: a screenshot is never
                  cropped. */}
              <figure className={page.figure}>
                <div className={page.frame}>
                  <CoverMedia
                    className={page.cover}
                    cover={data.cover}
                    video={data.coverVideo}
                    alt={data.coverCaption ? "" : data.coverAlt}
                    sizes={SIZES.feature}
                    loading="eager"
                  />
                </div>
                {data.coverCaption && (
                  <figcaption className={page.caption}>
                    {data.coverCaption}
                  </figcaption>
                )}
              </figure>
            </div>
          )}

          <div className={`container ${page.bodyGrid}`}>
            {(data.stack.length > 0 ||
              data.headings.length >= 3 ||
              data.link ||
              data.repo) && (
              <div className={page.aside}>
                {data.stack.length > 0 && (
                  <div>
                    <h2 className={page.asideHeading}>{labels.stack}</h2>
                    <ul className={styles.tags}>
                      {data.stack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Three headings is the floor: below that the outline is
                    longer than the scroll it saves. */}
                {data.headings.length >= 3 && (
                  <Toc label={labels.onThisPage} headings={data.headings} />
                )}
                {(data.link || data.repo) && (
                  <div className={page.links}>
                    {data.link && (
                      <a
                        className={styles.ctaSecondary}
                        href={data.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {labels.visitSite} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {data.repo && (
                      <a
                        className={styles.ctaSecondary}
                        href={data.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {labels.viewCode} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}

            <div
              className={`prose ${page.article}`}
              dangerouslySetInnerHTML={{ __html: data.html }}
            />
          </div>
        </div>

        {(data.prev || data.next || data.related.length > 0) && (
          <div className={`${styles.inverse} ${page.dark}`}>
            {(data.prev || data.next) && (
              <nav
                className={`container ${page.pager}`}
                aria-label={labels.pagerLabel}
              >
                {data.prev ? (
                  <Link className={page.pagerLink} href={data.prev.href}>
                    <span className={page.pagerDirection}>
                      ← {labels.prevProject}
                    </span>
                    <span className={page.pagerTitle}>
                      <span>{data.prev.title}</span>
                    </span>
                    {data.prev.subtitle && (
                      <span className={page.pagerSubtitle}>
                        {data.prev.subtitle}
                      </span>
                    )}
                  </Link>
                ) : (
                  <span aria-hidden="true" />
                )}
                {data.next ? (
                  <Link
                    className={`${page.pagerLink} ${page.pagerNext}`}
                    href={data.next.href}
                  >
                    <span className={page.pagerDirection}>
                      {labels.nextProject} →
                    </span>
                    <span className={page.pagerTitle}>
                      <span>{data.next.title}</span>
                    </span>
                    {data.next.subtitle && (
                      <span className={page.pagerSubtitle}>
                        {data.next.subtitle}
                      </span>
                    )}
                  </Link>
                ) : (
                  <span aria-hidden="true" />
                )}
              </nav>
            )}

            {data.related.length > 0 && (
              <section
                className={`container ${page.related}`}
                aria-labelledby="related-heading"
              >
                <div className={styles.sectionHead}>
                  <h2 id="related-heading" className={styles.sectionTitle}>
                    {labels.relatedProjects}
                  </h2>
                </div>
                <div className={page.relatedGrid}>
                  {data.related.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
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
    </BroadsheetShell>
  );
}
