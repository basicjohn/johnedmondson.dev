import Link from "next/link";
import type { Locale, Post } from "@/lib/types";
import { coverGradient, formatYear } from "@/lib/utils";
import { tagLabel } from "@/lib/tags";
import Tag from "@/components/atoms/Tag/Tag";
import styles from "./ProjectCard.module.scss";

type Props = {
  post: Post;
  locale: Locale;
  /** `feature` is the one large lead card on the home page: wider image, bigger title */
  variant?: "default" | "feature";
};

export default function ProjectCard({
  post,
  locale,
  variant = "default",
}: Props) {
  const href = `/${locale}/portfolio/${post.slug}`;
  const cls =
    variant === "feature" ? `${styles.card} ${styles.feature}` : styles.card;

  return (
    <article className={cls}>
      <Link
        href={href}
        className={styles.coverLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        {post.cover ? (
          <img
            className={styles.cover}
            src={post.cover}
            alt=""
            loading="lazy"
          />
        ) : (
          <div
            className={styles.cover}
            style={{ background: coverGradient(post.slug) }}
          >
            <span className={styles.coverInitial}>
              {post.title[locale].charAt(0)}
            </span>
          </div>
        )}
      </Link>
      <div className={styles.body}>
        {post.year && (
          <p className={styles.year}>{formatYear(post.year, locale)}</p>
        )}
        <h3 className={styles.title}>
          <Link href={href}>{post.title[locale]}</Link>
        </h3>
        <p className={styles.excerpt}>{post.excerpt[locale]}</p>
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
