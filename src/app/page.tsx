import Link from "next/link";
import type { Metadata } from "next";
import { locales } from "@/lib/types";

// A bare "/" is normally handled before this page is ever served: middleware
// does it in dev, and a CDN redirect to /<defaultLocale> does it in
// production. This page is the fallback for when neither runs.
//
// It deliberately does NOT auto-redirect. It used to carry a meta refresh,
// which is correct in isolation but became an infinite reload the moment a
// catch-all rewrite started serving this file for every path: refresh to
// /en, get this page again, refresh again. A link cannot loop.
export const metadata: Metadata = {
  title: "John Edmondson",
  robots: { index: false, follow: true },
};

const LABELS: Record<(typeof locales)[number], string> = {
  en: "English",
  de: "Deutsch",
};

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
