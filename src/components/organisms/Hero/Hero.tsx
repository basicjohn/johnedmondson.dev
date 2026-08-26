import type { Locale } from "@/lib/types";
import Button from "@/components/atoms/Button/Button";
import Greeting from "./Greeting";
import styles from "./Hero.module.scss";

type Props = {
  locale: Locale;
  greetings: string[];
  role: string;
  bio: string;
  ctaWork: string;
  ctaContact: string;
};

export default function Hero({ locale, greetings, role, bio, ctaWork, ctaContact }: Props) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <Greeting greetings={greetings} />
        <h1 className={styles.name}>John Edmondson</h1>
        <p className={styles.role}>{role}</p>
        <p className={styles.bio}>{bio}</p>
        <div className={styles.actions}>
          <Button href={`/${locale}/portfolio`}>{ctaWork}</Button>
          <Button variant="secondary" href={`/${locale}/contact`}>
            {ctaContact}
          </Button>
        </div>
      </div>
      <div className={styles.glow} aria-hidden="true" />
    </section>
  );
}
