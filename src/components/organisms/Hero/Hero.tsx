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
      {/* Name, role, portrait and copy are separate grid items so the
          portrait can sit beside the name on a phone, beside name and role
          on a tablet, and beside the whole text block on a desktop — see the
          grid-template-areas in the stylesheet. DOM order is the reading
          order. */}
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.name}>John Edmondson</h1>
        <p className={styles.role}>{role}</p>
        <div className={styles.portraitWrap}>
          <img
            className={styles.portrait}
            src="/images/john-headshot.jpg"
            alt={portraitAlt}
            width={720}
            height={720}
          />
        </div>
        <div className={styles.copy}>
          <p className={styles.bioLead}>{bioLead}</p>
          <p className={styles.bio}>{bio}</p>
          <div className={styles.actions}>
            <Button href={`/${locale}/portfolio`}>{ctaWork}</Button>
            <Button variant="secondary" href={`/${locale}/contact`}>
              {ctaContact}
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.glow} aria-hidden="true" />
    </section>
  );
}
