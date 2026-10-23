import type { Locale, Post } from "@/lib/types";
import { SITE_URL } from "@/lib/seo";
import { fullTitle } from "@/lib/utils";

type Schema = Record<string, unknown>;

type Props = {
  data: Schema | Schema[];
};

/**
 * Structured data for search engines. One script per page; pass an array to
 * emit several entities in one @graph.
 *
 * The JSON is inlined, so "<" is escaped: a "</script>" inside a title would
 * otherwise end the block early.
 */
export default function JsonLd({ data }: Props) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

// ---------- The site's entities ----------

export const PERSON_ID = `${SITE_URL}/#person`;

export function personSchema(opts: {
  jobTitle: string;
  email: string;
  sameAs: string[];
}): Schema {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "John Edmondson",
    url: SITE_URL,
    image: `${SITE_URL}/images/john-headshot.jpg`,
    jobTitle: opts.jobTitle,
    email: `mailto:${opts.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Freiburg",
      addressCountry: "DE",
    },
    sameAs: opts.sameAs,
  };
}

export function websiteSchema(locale: Locale): Schema {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "John Edmondson",
    inLanguage: locale,
    author: { "@id": PERSON_ID },
  };
}

/** A portfolio project: the year is a range, so only its start is dated */
export function projectSchema(post: Post, locale: Locale): Schema {
  const startYear = post.year?.match(/\d{4}/)?.[0];
  return {
    "@type": "CreativeWork",
    name: fullTitle(post, locale),
    description: post.excerpt[locale],
    url: `${SITE_URL}/${locale}/portfolio/${post.slug}`,
    inLanguage: locale,
    ...(post.cover && { image: `${SITE_URL}${post.cover}` }),
    ...(startYear && { dateCreated: startYear }),
    ...(post.client && {
      sourceOrganization: { "@type": "Organization", name: post.client },
    }),
    keywords: post.tags.join(", "),
    author: { "@id": PERSON_ID },
  };
}
