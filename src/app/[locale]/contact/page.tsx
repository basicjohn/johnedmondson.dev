import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor } from "@/lib/seo";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getSiteData } from "@/lib/content";
import { hasDescender } from "@/lib/utils";
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

/**
 * Light to dark: the title on the drafting grid, then the form and the
 * details reversed out of the dark ground, straight into the footer.
 */
export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  // The published address, not a personal one — this renders into a
  // mailto: link in the static export when no endpoint is configured.
  const site = getSiteData();
  const title = dict.contact.title;

  return (
    <>
      <header className={styles.intro}>
        <div className="container">
          <h1
            className={`${styles.title} ${hasDescender(title) ? styles.descends : ""}`}
          >
            {title}
          </h1>
          <p className={styles.lede}>{dict.contact.intro}</p>
        </div>
      </header>

      <div className={`inverse ${styles.formSection}`}>
        {/* Form left, the facts a recruiter checks first on the right */}
        <div className={`container ${styles.columns}`}>
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
          />
        </div>
      </div>
    </>
  );
}
