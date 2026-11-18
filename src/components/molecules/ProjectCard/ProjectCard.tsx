import Link from "next/link";
import type { Locale, Post } from "@/lib/types";
import { formatYear, kindLabel } from "@/lib/utils";
import { tagLabel } from "@/lib/tags";
import Tag from "@/components/atoms/Tag/Tag";
import CoverMedia from "@/components/atoms/CoverMedia/CoverMedia";
import styles from "./ProjectCard.module.scss";

const SIZES = {
  feature: "(min-width: 1024px) 40rem, 100vw",
  default: "(min-width: 1024px) 32rem, (min-width: 768px) 50vw, 100vw",
  compact: "(min-width: 1024px) 22rem, (min-width: 768px) 50vw, 100vw",
};

type Props = {
  post: Post;
  locale: Locale;
  /**
   * `feature`: the one large lead, image beside the text. `compact`: a
   * smaller card for rows of three (Other projects).
   */
  variant?: "default" | "feature" | "compact";
  /** Position in its row, for the staggered scroll reveal */
  index?: number;
};

/**
 * A project as the Broadsheet sets it: the image in an edged frame with a
 * hard shadow, then the dates and kind, the name, the subhead, a one-line
 * summary and the tags. The whole card is one link.
 */
export default function ProjectCard({
  post,
  locale,
  variant = "default",
  index = 0,
}: Props) {
  const href = `/${locale}/portfolio/${post.slug}`;
  const title = post.title[locale];
  const cls = [
    styles.card,
    variant === "feature" && styles.feature,
    variant === "compact" && styles.compact,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={cls}
      data-reveal=""
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className={styles.media}>
        {post.cover ? (
          <CoverMedia
            className={styles.cover}
            cover={post.cover}
            video={post.coverVideo}
            alt=""
            sizes={SIZES[variant]}
          />
        ) : (
          // No cover yet: the initial on a marigold field over the grid
          <div className={styles.fallback} aria-hidden="true">
            <span>{title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className={styles.body}>
        {/* "2025 – present · Contract": the year alone could not separate
            the paid roles from the side projects without opening each one. */}
        {(post.year || post.kind) && (
          <p className={styles.eyebrow}>
            {[
              post.year && formatYear(post.year, locale),
              post.kind && kindLabel(post.kind, locale),
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
        <h3 className={styles.title}>
          {/* Stretched over the whole card, so the image is a target too */}
          <Link href={href}>{title}</Link>
        </h3>
        {post.subtitle?.[locale] && (
          <p className={styles.subtitle}>{post.subtitle[locale]}</p>
        )}
        <p className={styles.summary}>
          {post.summary?.[locale] || post.excerpt[locale]}
        </p>
        {post.tags.length > 0 && (
          <ul className={styles.tags}>
            {post.tags.slice(0, 4).map((tag) => (
              <li key={tag}>
                <Tag label={tagLabel(tag, locale)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
