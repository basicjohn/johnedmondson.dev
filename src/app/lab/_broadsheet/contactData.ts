// What the live contact page (src/app/[locale]/contact/page.tsx) renders,
// gathered for the Broadsheet version in the lab.
import { getDictionary } from "@/lib/i18n";
import { getSiteData } from "@/lib/content";
import { CALENDLY_URL } from "@/lib/config";
import type { Locale } from "@/lib/types";
import { getShellData } from "../_shared/homeData";

export function getContactPage(locale: Locale) {
  const dict = getDictionary(locale);
  const site = getSiteData();
  return {
    shell: getShellData(locale, "broadsheet", {
      en: "/lab/en/broadsheet/contact",
      de: "/lab/de/broadsheet/contact",
    }),
    locale,
    labels: { ...dict.contact, elsewhere: dict.footer.elsewhere },
    email: site.email,
    socials: site.socials,
    calendarUrl: CALENDLY_URL,
    // Unset under `next dev` (it lives in .env.production), so the lab form
    // falls back to opening a mail client and never sends real mail.
    endpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT,
  };
}

export type ContactPageData = ReturnType<typeof getContactPage>;
