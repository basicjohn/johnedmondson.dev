import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { getSiteData } from "@/lib/content";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Canonical has to be declared here rather than in the root layout: set once
// at the root it applies to every locale, so /de would announce itself as a
// duplicate of /en and drop out of German results entirely.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const current = isLocale(locale) ? locale : "en";
  return {
    openGraph: { locale: current === "de" ? "de_DE" : "en_US" },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const site = getSiteData();
  return (
    <div lang={locale}>
      <a className="visually-hidden" href="#main">
        {dict.common.skipToContent}
      </a>
      <Header
        locale={locale}
        nav={dict.nav}
        languageLabel={dict.common.languageLabel}
      />
      <main id="main">{children}</main>
      <Footer
        labels={dict.footer}
        socials={site.socials}
        email={site.email}
        resume={site.resume}
      />
    </div>
  );
}
