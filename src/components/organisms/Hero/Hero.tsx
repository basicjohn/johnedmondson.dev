import type { Locale } from "@/lib/types";
import { imageAttrs } from "@/lib/images";
import Button from "@/components/atoms/Button/Button";
import styles from "./Hero.module.scss";

type Props = {
  locale: Locale;
  role: string;
  bioLead: string;
  bio: string;
  portraitAlt: string;
  ctaWork: string;
  ctaContact: string;
};

/**
 * The cover: the name at poster size on the drafting grid, the portrait in
 * the space "John" leaves on the first line, the role as a dateline, then
 * the bio and the two ways onward.
 */
export default function Hero({
  locale,
  role,
  bioLead,
  bio,
  portraitAlt,
  ctaWork,
  ctaContact,
}: Props) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        {/* Each line is its own mask, so it can rise into place on load */}
        <h1 className={styles.name}>
          <span className={styles.line}>
            <span>John</span>
          </span>{" "}
          <span className={styles.line}>
            <span>Edmondson</span>
          </span>
        </h1>
        <p className={styles.role}>
          {role}
          {/* A dateline rule to the margin */}
          <span className={styles.roleRule} aria-hidden="true" />
        </p>
        <div className={styles.portraitWrap}>
          <img
            className={styles.portrait}
            alt={portraitAlt}
            {...imageAttrs(
              "/images/john-headshot.jpg",
              "(min-width: 1024px) 14rem, (min-width: 768px) 10rem, 5.25rem",
            )}
          />
        </div>
        <div className={styles.copy}>
          <p className={styles.bioLead}>{bioLead}</p>
          <p className={styles.bio}>{bio}</p>
          <div className={styles.actions}>
            <Button href={`/${locale}/portfolio`}>
              {ctaWork} <span aria-hidden="true">→</span>
            </Button>
            <Button variant="secondary" href={`/${locale}/contact`}>
              {ctaContact}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
