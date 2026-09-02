import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor } from "@/lib/seo";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getSiteData } from "@/lib/content";
import ContactForm from "@/components/organisms/ContactForm/ContactForm";
import Button from "@/components/atoms/Button/Button";
import styles from "./page.module.scss";

const CALENDLY_URL = "https://calendly.com/johnedmondsondev/lets-chat";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.contact.title,
    description: dict.contact.intro,
    alternates: alternatesFor(locale, "/contact"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  // The published address, not a personal one — this renders into a
  // mailto: link in the static export when no endpoint is configured.
  const { email } = getSiteData();

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{dict.contact.title}</h1>
        <p className={styles.intro}>{dict.contact.intro}</p>
      </header>

      <div className={styles.stack}>
        <ContactForm
          labels={dict.contact}
          endpoint={process.env.NEXT_PUBLIC_CONTACT_ENDPOINT}
          fallbackEmail={email}
        />

        {/* Below the form rather than beside it: it is the alternative to
            writing, so it reads in sequence — form, then "or talk live". */}
        <aside className={styles.schedule}>
          <div>
            <h2 className={styles.scheduleHeading}>
              {dict.contact.scheduleHeading}
            </h2>
            <p className={styles.scheduleText}>{dict.contact.scheduleText}</p>
          </div>
          <Button variant="secondary" href={CALENDLY_URL} external>
            {dict.contact.scheduleCta}
          </Button>
        </aside>
      </div>
    </div>
  );
}
