import Link from "next/link";

// Global 404 — bilingual, since it can render outside a locale segment.
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "var(--text-3xl)" }}>404</h1>
      <p style={{ color: "var(--color-ink-soft)", maxWidth: "26rem" }}>
        Page not found · Seite nicht gefunden
      </p>
      <Link href="/en" style={{ fontWeight: 700 }}>
        Back to home · Zur Startseite
      </Link>
    </div>
  );
}
