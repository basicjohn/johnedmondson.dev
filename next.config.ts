import type { NextConfig } from "next";
import path from "path";

// `next build` runs with NODE_ENV=production; `next dev` does not.
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // The CMS writes posts to the local filesystem, so it can only ever run
  // under `next dev`. Its routes are named *.dev.tsx / *.dev.ts and that
  // extension is only registered outside production, which keeps them out
  // of the static export entirely — an export can contain neither route
  // handlers nor dynamic pages without generateStaticParams, and
  // /api/admin/posts and /admin/edit/[id] are both.
  pageExtensions: isProduction
    ? ["tsx", "ts"]
    : ["dev.tsx", "dev.ts", "tsx", "ts"],

  // Static HTML export. Amplify serves `out/` from S3 and CloudFront, the
  // same way it served CRA's `build/` — no compute platform involved.
  // Note this drops middleware.ts silently; the locale redirect for a bare
  // "/" is handled by src/app/page.tsx and an Amplify rewrite instead.
  ...(isProduction ? { output: "export" as const } : {}),

  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
  },
};

export default nextConfig;
