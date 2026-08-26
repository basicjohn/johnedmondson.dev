import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import ContactForm from "@/components/organisms/ContactForm/ContactForm";
import Button from "@/components/atoms/Button/Button";
import styles from "./page.module.scss";

const CALENDLY_URL = "https://calendly.com/johnedmondsondev/lets-chat";
const FALLBACK_EMAIL = "edmondsonj@gmail.com";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.contact.title, description: dict.contact.intro };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{dict.contact.title}</h1>
        <p className={styles.intro}>{dict.contact.intro}</p>
      </header>

      <div className={styles.grid}>
        <ContactForm
          labels={dict.contact}
          endpoint={process.env.NEXT_PUBLIC_CONTACT_ENDPOINT}
          fallbackEmail={FALLBACK_EMAIL}
        />

        <aside className={styles.schedule}>
          <h2 className={styles.scheduleHeading}>{dict.contact.scheduleHeading}</h2>
          <p className={styles.scheduleText}>{dict.contact.scheduleText}</p>
          <Button variant="secondary" href={CALENDLY_URL} external>
            {dict.contact.scheduleCta}
          </Button>
        </aside>
      </div>
    </div>
  );
}
