"use client";

import { usePathname } from "next/navigation";
import type { Locale, SiteData } from "@/lib/types";
import { getDictionary, isLocale } from "@/lib/i18n";
import Button from "@/components/atoms/Button/Button";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";
import styles from "./NotFound.module.scss";

// Next gives a not-found page no params, so the locale comes from the URL
// the visitor actually typed: /de/anything reads German, everything else
// English.
function localeFromPath(pathname: string | null): Locale {
  const first = (pathname ?? "").split("/")[1] ?? "";
  return isLocale(first) ? first : "en";
}

/** The 404 body: title, one line, and the three places worth going next */
export function NotFoundBody() {
  const locale = localeFromPath(usePathname());
  const dict = getDictionary(locale);

  return (
    <div className={`container ${styles.page}`}>
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1 className={styles.title}>{dict.notFound.title}</h1>
      <p className={styles.text}>{dict.notFound.text}</p>
      <div className={styles.actions}>
        <Button href={`/${locale}`}>{dict.notFound.backHome}</Button>
        <Button variant="secondary" href={`/${locale}/portfolio`}>
          {dict.nav.portfolio}
        </Button>
        <Button variant="secondary" href={`/${locale}/contact`}>
          {dict.nav.contact}
        </Button>
      </div>
    </div>
  );
}

type PageProps = { site: SiteData };

/**
 * The full page for the root not-found, which renders outside the locale
 * layout and so has to bring its own header and footer. Inside a locale
 * segment, render NotFoundBody alone — the layout already supplies both.
 */
export default function NotFoundPage({ site }: PageProps) {
  const locale = localeFromPath(usePathname());
  const dict = getDictionary(locale);

  return (
    <div lang={locale}>
      <Header
        locale={locale}
        nav={dict.nav}
        languageLabel={dict.common.languageLabel}
      />
      <main id="main">
        <NotFoundBody />
      </main>
      <Footer
        labels={dict.footer}
        socials={site.socials}
        email={site.email}
        resume={site.resume}
      />
    </div>
  );
}
