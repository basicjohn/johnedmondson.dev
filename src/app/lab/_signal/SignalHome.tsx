import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { imageAttrs } from "@/lib/images";
import CoverMedia from "@/components/atoms/CoverMedia/CoverMedia";
import LabHeader from "../_shared/LabHeader";
import Motion from "../_shared/Motion";
import type { HomeData, Project } from "../_shared/homeData";
import styles from "./Signal.module.scss";

const sans = Geist({ subsets: ["latin"], variable: "--font-signal" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-signal-mono" });

// Lead card is the wide left column of the bento from 1024px; the other two
// share the narrower right column.
const SIZES = {
  lead: "(min-width: 1024px) 42rem, 100vw",
  card: "(min-width: 1024px) 26rem, (min-width: 768px) 50vw, 100vw",
};

/** One span per word, so the About statement can light up line by line */
function words(text: string) {
  return text.split(" ").map((word, i) => (
    <span key={i} className={styles.word}>
      {word}{" "}
    </span>
  ));
}

function Card({
  project,
  feature = false,
  index,
}: {
  project: Project;
  feature?: boolean;
  index: number;
}) {
  return (
    <article
      className={`${styles.card} ${feature ? styles.feature : ""}`}
      data-spotlight=""
      data-reveal=""
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className={styles.cardMedia}>
        {project.cover && feature ? (
          // The lead's screenshot is shown whole, in a browser window on
          // the blueprint, rather than cropped to fill a tall cell.
          <div className={styles.frame}>
            <CoverMedia
              className={styles.frameCover}
              cover={project.cover}
              video={project.coverVideo}
              alt=""
              sizes={SIZES.lead}
            />
          </div>
        ) : project.cover ? (
          <CoverMedia
            className={styles.cardCover}
            cover={project.cover}
            video={project.coverVideo}
            alt=""
            sizes={SIZES.card}
          />
        ) : (
          <div className={styles.cardFallback} aria-hidden="true">
            <span>{project.initial}</span>
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        {project.eyebrow && (
          <p className={styles.cardEyebrow}>{project.eyebrow}</p>
        )}
        <h3 className={styles.cardTitle}>
          {/* Stretched over the whole card, so the image is a target too */}
          <Link href={project.href}>{project.title}</Link>
        </h3>
        {project.subtitle && (
          <p className={styles.cardSubtitle}>{project.subtitle}</p>
        )}
        <p className={styles.cardSummary}>{project.summary}</p>
        {project.tags.length > 0 && (
          <ul className={styles.cardTags}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

/**
 * Option A — "Signal". The same home page at night: warm black, bone-white
 * type, the gold pushed to a luminous amber, a blueprint grid that lights up
 * under the pointer, and the work as a bento grid.
 */
export default function SignalHome({ data }: { data: HomeData }) {
  const { home, now, lead, rest, links, footer } = data;

  return (
    <div className={`${sans.variable} ${mono.variable} ${styles.root}`}>
      <Motion />
      <a className="skip-link" href="#main">
        {data.common.skipToContent}
      </a>
      <LabHeader
        classes={styles}
        locale={data.locale}
        labels={{ ...data.nav, language: data.common.languageLabel }}
        links={links}
      />

      <main id="main">
        <section className={styles.hero} data-spotlight="">
          <div className={styles.aurora} aria-hidden="true">
            <span />
            <span />
          </div>
          <div className={styles.blueprint} aria-hidden="true" />
          <div className={`container ${styles.heroInner}`}>
            <h1 className={styles.name}>
              <span>John</span> <span>Edmondson</span>
            </h1>
            <p className={styles.role}>{home.role}</p>
            <div className={styles.portraitWrap}>
              <div className={styles.orbit} aria-hidden="true" />
              <img
                className={styles.portrait}
                alt={home.portraitAlt}
                {...imageAttrs(
                  "/images/john-headshot.jpg",
                  "(min-width: 1024px) 21rem, 9rem",
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
          <div className="container">
            <div className={styles.console} data-reveal="">
              <div className={styles.consoleBar}>
                <h2 id="now-heading" className={styles.consoleHeading}>
                  <span className={styles.live} aria-hidden="true" />
                  {now.heading}
                </h2>
                {now.updatedText && (
                  <p className={styles.updated}>
                    {now.updatedLabel}{" "}
                    <time dateTime={now.updated}>{now.updatedText}</time>
                  </p>
                )}
              </div>
              <dl className={styles.nowList}>
                {now.items.map((item) => (
                  <div
                    key={item.label}
                    className={styles.nowItem}
                    data-spotlight=""
                  >
                    <dt>{item.label}</dt>
                    <dd>
                      <Link href={item.href} className={styles.nowLink}>
                        {item.text}
                        <span className={styles.arrow} aria-hidden="true">
                          ↗
                        </span>
                      </Link>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {lead && (
          <section
            className={`container ${styles.section}`}
            aria-labelledby="work-heading"
          >
            <div className={styles.sectionHead} data-reveal="">
              <div>
                <p className={styles.index} aria-hidden="true">
                  01
                </p>
                <h2 id="work-heading" className={styles.sectionTitle}>
                  {home.featuredWork}
                </h2>
              </div>
              <Link className={styles.allLink} href={links.portfolio}>
                {home.viewAllWork} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className={styles.bento}>
              <Card project={lead} feature index={0} />
              {rest.map((project, i) => (
                <Card key={project.id} project={project} index={i + 1} />
              ))}
            </div>
          </section>
        )}

        <section
          className={`container ${styles.section} ${styles.about}`}
          aria-labelledby="about-heading"
        >
          <div className={styles.aboutHead} data-reveal="">
            <p className={styles.index} aria-hidden="true">
              02
            </p>
            <h2 id="about-heading" className={styles.sectionTitle}>
              {home.aboutHeading}
            </h2>
          </div>
          <div>
            <p className={styles.aboutWork}>{words(home.aboutWork)}</p>
            <p className={styles.aboutLife} data-reveal="">
              {home.aboutLife}
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerGrid}`}>
          <div>
            <h2 className={styles.footerHeading}>
              {footer.availabilityHeading}
            </h2>
            <p className={styles.availabilityText}>
              <span className={styles.dot} aria-hidden="true" />
              {footer.availabilityText}
            </p>
            <a className={styles.email} href={`mailto:${data.email}`}>
              {data.email}
            </a>
            {data.resume && (
              <a className={styles.resume} href={data.resume}>
                {footer.resume}
              </a>
            )}
          </div>
          <div>
            <h2 className={styles.footerHeading}>{footer.elsewhere}</h2>
            <ul className={styles.socials}>
              {data.socials.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`container ${styles.legal}`}>
          <p>
            © {new Date().getFullYear()} John Edmondson. {footer.rights}
          </p>
          <p>{footer.builtWith}</p>
        </div>
      </footer>
    </div>
  );
}
