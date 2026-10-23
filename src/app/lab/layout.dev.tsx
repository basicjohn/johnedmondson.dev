import type { Metadata } from "next";

// Home page redesign experiments. Like /admin, every route here is named
// *.dev.tsx, so it exists under `next dev` and never in the static export.
export const metadata: Metadata = {
  title: { absolute: "Lab · John Edmondson" },
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
