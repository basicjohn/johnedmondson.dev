import Link from "next/link";
import type { Metadata } from "next";
import { defaultLocale } from "@/lib/types";

const target = `/${defaultLocale}`;

// A bare "/" is normally redirected by middleware.ts, which a static export
// silently drops. Next's own redirect() then emits a client-side hop, so the
// page is blank for anything that does not run JavaScript — including some
// crawlers. The meta refresh below covers that, and the visible link covers
// the case where even the refresh is ignored.
//
// The production fix is an Amplify rewrite from "/" to "/en"; this page is
// what makes the site correct until that rule exists, and harmless after.
export const metadata: Metadata = {
  title: "Redirecting…",
  robots: { index: false, follow: true },
};

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <main style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        <p>
          Continue to <Link href={target}>johnedmondson.dev</Link>
        </p>
      </main>
    </>
  );
}
