import type { Metadata } from "next";
import Script from "next/script";
import { Merriweather, Mulish } from "next/font/google";
import "@/styles/globals.scss";

const serif = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Mulish({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://www.johnedmondson.dev";
const TITLE = "John Edmondson — Product Engineer · Full-Stack";
// Same positioning as the LinkedIn headline: the title, the stack, and the
// kind of work — this is the snippet search results and link previews show.
const DESCRIPTION =
  "John Edmondson, product engineer in Freiburg, Germany. Full-stack work in React, TypeScript, Go and PostgreSQL: scalable, data-driven systems for mission-driven teams. Portfolio and writing.";

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
    images: [
      {
        url: "/preview-image.jpg",
        width: 1200,
        height: 1181,
        alt: "John Edmondson",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/preview-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the home page's GridIntro sets an attribute
    // on <html> before React loads (it has to, to beat first paint), which
    // is otherwise reported as a server/client mismatch. Scoped to this
    // element's attributes only; children are still checked.
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable}`}
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
