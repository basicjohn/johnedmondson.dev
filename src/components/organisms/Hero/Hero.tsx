import type { Locale } from "@/lib/types";
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
        <div>
          <h1 className={styles.name}>John Edmondson</h1>
          <p className={styles.role}>{role}</p>
          <p className={styles.bioLead}>{bioLead}</p>
          <p className={styles.bio}>{bio}</p>
          <div className={styles.actions}>
            <Button href={`/${locale}/portfolio`}>{ctaWork}</Button>
            <Button variant="secondary" href={`/${locale}/contact`}>
              {ctaContact}
            </Button>
          </div>
        </div>
        <div className={styles.portraitWrap}>
          <img
            className={styles.portrait}
            src="/images/john-headshot.jpg"
            alt={portraitAlt}
            width={720}
            height={720}
          />
        </div>
      </div>
      <div className={styles.glow} aria-hidden="true" />
    </section>
  );
}
