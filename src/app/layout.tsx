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
const TITLE = "John Edmondson — Full-Stack Software Engineer";
const DESCRIPTION =
  "Portfolio and writing of John Edmondson, a software engineer based in Freiburg, Germany.";

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
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
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
