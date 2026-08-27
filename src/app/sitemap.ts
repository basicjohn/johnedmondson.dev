import type { MetadataRoute } from "next";
import { getPostsByType } from "@/lib/content";
import { locales } from "@/lib/types";
import { WRITING_SECTION_PUBLIC } from "@/lib/config";

const SITE_URL = "https://www.johnedmondson.dev";

// Required under output: "export" — without it Next treats sitemap.xml as a
// dynamic route handler and refuses to build.
export const dynamic = "force-static";

// Generated at build time, so it works under output: "export" — the file is
// emitted into out/sitemap.xml alongside the pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/portfolio", "/contact"];
  if (WRITING_SECTION_PUBLIC) staticPaths.splice(2, 0, "/writing");
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        changeFrequency: path === "" ? "monthly" : "weekly",
        priority: path === "" ? 1 : 0.8,
      });
    }

    // Only published posts have generated pages, so only they belong here.
    const types = WRITING_SECTION_PUBLIC
      ? (["portfolio", "writing"] as const)
      : (["portfolio"] as const);
    for (const type of types) {
      for (const post of getPostsByType(type)) {
        entries.push({
          url: `${SITE_URL}/${locale}/${type}/${post.slug}`,
          lastModified: post.date,
          changeFrequency: "yearly",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
