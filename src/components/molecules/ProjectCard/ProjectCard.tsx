import Link from "next/link";
import type { Locale, Post } from "@/lib/types";
import { coverGradient } from "@/lib/utils";
import Tag from "@/components/atoms/Tag/Tag";
import styles from "./ProjectCard.module.scss";

type Props = {
  post: Post;
  locale: Locale;
};

export default function ProjectCard({ post, locale }: Props) {
  const href = `/${locale}/portfolio/${post.slug}`;

  return (
    <article className={styles.card}>
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
        {post.year && <p className={styles.year}>{post.year}</p>}
        <h3 className={styles.title}>
          <Link href={href}>{post.title[locale]}</Link>
        </h3>
        <p className={styles.excerpt}>{post.excerpt[locale]}</p>
        {post.tags.length > 0 && (
          <ul className={styles.tags}>
            {post.tags.slice(0, 4).map((tag) => (
              <li key={tag}>
                <Tag label={tag} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
