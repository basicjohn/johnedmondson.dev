import Link from "next/link";
import { imageAttrs } from "@/lib/images";
import Asterisk from "./Asterisk";
import BroadsheetShell from "./BroadsheetShell";
import ProjectCard from "./ProjectCard";
import type { HomeData, NowItem } from "../_shared/homeData";
import styles from "./Broadsheet.module.scss";

/** One pass of the ticker. The second copy exists only to close the loop. */
function NowGroup({
  now,
  copy = false,
}: {
  now: HomeData["now"];
  copy?: boolean;
}) {
  return (
    <div
      className={styles.group}
      aria-hidden={copy || undefined}
      inert={copy || undefined}
    >
      <h2 id={copy ? undefined : "now-heading"} className={styles.nowHeading}>
        {now.heading}
      </h2>
      <dl className={styles.nowList}>
        {now.items.map((item: NowItem) => (
          <div key={item.label} className={styles.nowItem}>
            <dt>{item.label}</dt>
            <dd>
              <Link href={item.href}>{item.text}</Link>
              <Asterisk className={styles.tickMark} />
            </dd>
          </div>
        ))}
      </dl>
      {now.updatedText && (
        <p className={styles.updated}>
          {now.updatedLabel}{" "}
          <time dateTime={now.updated}>{now.updatedText}</time>
        </p>
      )}
    </div>
  );
}

/**
 * Option B — "Broadsheet". The current paper, ink and gold, set like a
 * magazine cover: a poster-size name over the drafting grid, a gold ticker
 * for "Currently", and the work as a spread on a plain off-white sheet.
 */
export default function BroadsheetHome({ data }: { data: HomeData }) {
  const { home, now, lead, rest, links } = data;

  return (
    <BroadsheetShell shell={data}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <h1 className={styles.name}>
            <span className={styles.line}>
              <span>John</span>
            </span>{" "}
            <span className={styles.line}>
              <span>Edmondson</span>
            </span>
          </h1>
          <p className={styles.role}>
            {home.role}
            {/* A dateline rule to the margin */}
            <span className={styles.roleRule} aria-hidden="true" />
          </p>
          <div className={styles.portraitWrap}>
            <img
              className={styles.portrait}
              alt={home.portraitAlt}
              {...imageAttrs(
                "/images/john-headshot.jpg",
                "(min-width: 1024px) 14rem, (min-width: 768px) 10rem, 5.25rem",
              )}
            />
          </div>
          <div className={styles.copy}>
            <p className={styles.bioLead}>{home.bioLead}</p>
            <p className={styles.bio}>{home.bio}</p>
            <div className={styles.actions}>
              <Link className={styles.ctaPrimary} href={links.portfolio}>
                {home.ctaWork} <span aria-hidden="true">→</span>
              </Link>
              <Link className={styles.ctaSecondary} href={links.contact}>
                {home.ctaContact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.now} aria-labelledby="now-heading">
        <div className={styles.track}>
          <NowGroup now={now} />
          <NowGroup now={now} copy />
        </div>
      </section>

      {lead && (
        <section
          className={`container ${styles.section} ${styles.inverse}`}
          aria-labelledby="work-heading"
        >
          <div className={styles.sectionHead} data-reveal="">
            <span className={styles.sectionNo} aria-hidden="true">
              01
            </span>
            <h2 id="work-heading" className={styles.sectionTitle}>
              {home.featuredWork}
            </h2>
            <Link className={styles.allLink} href={links.portfolio}>
              {home.viewAllWork} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ProjectCard project={lead} variant="feature" />
          <div className={styles.pair}>
            {rest.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>
      )}

      <section
        className={`container ${styles.section} ${styles.inverse}`}
        aria-labelledby="about-heading"
      >
        <div className={styles.sectionHead} data-reveal="">
          <span className={styles.sectionNo} aria-hidden="true">
            02
          </span>
          <h2 id="about-heading" className={styles.sectionTitle}>
            {home.aboutHeading}
          </h2>
        </div>
        <div className={styles.about}>
          <p className={styles.aboutWork} data-reveal="">
            <span className={styles.highlight}>{home.aboutWork}</span>
          </p>
          <p className={styles.aboutLife} data-reveal="">
            {home.aboutLife}
          </p>
        </div>
      </section>
    </BroadsheetShell>
  );
}
