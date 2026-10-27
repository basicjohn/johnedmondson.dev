import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, IBM_Plex_Mono, Mulish } from "next/font/google";
import "@/styles/globals.scss";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

// Three faces, one job each (see planning/taste-profile.md). Fraunces is
// the display face: names, headings, statements — never small text. One
// variable file covers every weight; SOFT and the optical-size axis are
// set per use. Normal style only: nothing on the site sets it in italic.
const serif = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  variable: "--font-serif",
  display: "swap",
});

// Small functional type — labels, dates, tags, the role line — which holds
// up at 13px where the serif doesn't.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Mulish({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const TITLE = "John Edmondson — Product Engineer · Full-Stack";
// Same positioning as the LinkedIn headline: the title, the stack, and the
// kind of work — this is the snippet search results and link previews show.
const DESCRIPTION =
  "John Edmondson, product engineer in Freiburg, Germany. Full-stack work in React, TypeScript, Go and PostgreSQL: scalable, data-driven systems for mission-driven teams. Projects and writing.";

// Carried over from the CRA app's index.html so the cutover does not break
// the property's traffic history.
const GA_MEASUREMENT_ID = "G-JPDW3E7F0W";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · John Edmondson" },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "John Edmondson",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    alternateLocale: ["de_DE"],
    // Kept as JPEG rather than WebP: crawler support for WebP share cards
    // is still uneven where it matters most.
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

// Browser chrome matches the header bar; there is no dark mode — the dark
// sections are part of the design, not a theme.
export const viewport: Viewport = {
  themeColor: "#fcfaf6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the Motion component sets an attribute on
    // <html> before React loads (it has to, to beat first paint), which is
    // otherwise reported as a server/client mismatch. Scoped to this
    // element's attributes only; children are still checked.
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
