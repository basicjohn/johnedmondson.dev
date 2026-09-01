import type { Metadata } from "next";
import { locales } from "@/lib/types";

// The bare "/" should never be *seen*: middleware redirects it in dev, the
// CDN redirect ("/" -> "/en", 302) does in production, and if neither runs
// the inline script below forwards the visitor before first paint. What
// remains in the markup is not a landing page — just two plain links, the
// fallback for scriptless visitors.
//
// It must never redirect UNCONDITIONALLY. This page once carried a meta
// refresh, which became an infinite reload when a catch-all rewrite started
// serving this file for every path: refresh to /en, get this page again,
// refresh again. The script checks the real pathname first — served for "/"
// it redirects; served for any other path it does nothing, and links cannot
// loop.
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
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1.5rem",
      }}
    >
      <script dangerouslySetInnerHTML={{ __html: LOCALE_REDIRECT }} />
      <p style={{ color: "var(--color-ink-soft)" }}>
        {locales.map((locale, i) => (
          <span key={locale}>
            {i > 0 && <span aria-hidden="true"> · </span>}
            <a
              href={`/${locale}`}
              style={{
                fontWeight: 700,
                color: "var(--color-accent-strong)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {LABELS[locale]}
            </a>
          </span>
        ))}
      </p>
    </main>
  );
}
