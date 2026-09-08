import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { getSiteData } from "@/lib/content";
import { openGraphFor } from "@/lib/seo";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";
import JsonLd, {
  personSchema,
  websiteSchema,
} from "@/components/atoms/JsonLd/JsonLd";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Canonical has to be declared here rather than in the root layout: set once
// at the root it applies to every locale, so /de would announce itself as a
// duplicate of /en and drop out of German results entirely.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const current = isLocale(locale) ? locale : "en";
  // The full block, not just `locale`: setting one Open Graph field here
  // replaced the root layout's whole object, so every locale page shipped
  // without an og:image at all.
  return { openGraph: openGraphFor(current) };
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
      <JsonLd
        data={[
          websiteSchema(locale),
          personSchema({
            jobTitle: dict.home.role,
            email: site.email,
            sameAs: site.socials.map((s) => s.url),
          }),
        ]}
      />
      <a className="skip-link" href="#main">
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
