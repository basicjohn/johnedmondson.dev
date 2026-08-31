import Link from "next/link";
import type { Metadata } from "next";
import { locales } from "@/lib/types";

// A bare "/" is normally handled before this page is ever served: middleware
// does it in dev, and a CDN redirect to /<defaultLocale> does it in
// production. This page is the fallback for when neither runs.
//
// It must never redirect UNCONDITIONALLY. It used to carry a meta refresh,
// which is correct in isolation but became an infinite reload the moment a
// catch-all rewrite started serving this file for every path: refresh to
// /en, get this page again, refresh again. The script below therefore checks
// the real pathname first — served for "/" it forwards the visitor to their
// browser's language and no recruiter ever sees an interstitial; served for
// any other path it does nothing, and the visible links cannot loop.
export const metadata: Metadata = {
  title: "John Edmondson",
  robots: { index: false, follow: true },
};

const LABELS: Record<(typeof locales)[number], string> = {
  en: "English",
  de: "Deutsch",
};

// Kept dependency-free and ES5-safe; it ships verbatim into the static HTML.
// An earlier language choice (the header toggle writes a `locale` cookie)
// wins over Accept-Language-style detection via navigator.languages.
const LOCALE_REDIRECT = `(function () {
  if (location.pathname !== "/") return;
  var pick = null;
  var cookie = document.cookie.match(/(?:^|; )locale=(en|de)(?:;|$)/);
  if (cookie) pick = cookie[1];
  if (!pick) {
    var langs = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < langs.length; i++) {
      var lang = String(langs[i]).toLowerCase();
      if (lang.indexOf("de") === 0) { pick = "de"; break; }
      if (lang.indexOf("en") === 0) { pick = "en"; break; }
    }
  }
  location.replace("/" + (pick || "en"));
})();`;

export default function RootPage() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1.5rem",
        maxWidth: "32rem",
        margin: "0 auto",
        padding: "4rem 1.5rem",
      }}
    >
      <script dangerouslySetInnerHTML={{ __html: LOCALE_REDIRECT }} />
      <h1 style={{ fontFamily: "var(--font-serif)", margin: 0 }}>
        John Edmondson
      </h1>
      <p style={{ color: "var(--color-ink-soft)", margin: 0 }}>
        Software engineer, based in Freiburg. Choose a language to continue.
      </p>
      <nav
        aria-label="Language"
        style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}
      >
        {locales.map((locale) => (
          <Link
            key={locale}
            href={`/${locale}`}
            style={{
              fontWeight: 700,
              color: "var(--color-accent-strong)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            {LABELS[locale]}
          </Link>
        ))}
      </nav>
    </main>
  );
}
