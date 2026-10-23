import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor } from "@/lib/seo";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getSiteData } from "@/lib/content";
import { CALENDLY_URL } from "@/lib/config";
import ContactForm from "@/components/organisms/ContactForm/ContactForm";
import ContactAside from "@/components/organisms/ContactAside/ContactAside";
import styles from "./page.module.scss";

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
  const site = getSiteData();

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{dict.contact.title}</h1>
        <p className={styles.intro}>{dict.contact.intro}</p>
      </header>

      {/* Form left, the facts a recruiter checks first on the right. The
          right column used to be bare grid on every desktop. */}
      <div className={styles.columns}>
        <ContactForm
          labels={dict.contact}
          endpoint={process.env.NEXT_PUBLIC_CONTACT_ENDPOINT}
          fallbackEmail={site.email}
        />
        <ContactAside
          locale={locale}
          labels={{ ...dict.contact, elsewhere: dict.footer.elsewhere }}
          email={site.email}
          socials={site.socials}
          calendarUrl={CALENDLY_URL}
        />
      </div>
    </div>
  );
}
