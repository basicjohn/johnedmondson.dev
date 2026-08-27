import Link from "next/link";
import type { Locale, Post } from "@/lib/types";
import { formatDate, readingTime } from "@/lib/utils";
import PostMeta from "@/components/molecules/PostMeta/PostMeta";
import Tag from "@/components/atoms/Tag/Tag";
import styles from "./PostCard.module.scss";

type Props = {
  post: Post;
  locale: Locale;
  minReadLabel: string;
};

export default function PostCard({ post, locale, minReadLabel }: Props) {
  const href = `/${locale}/writing/${post.slug}`;

  return (
    <article className={styles.card}>
      <PostMeta
        date={formatDate(post.date, locale)}
        readingTime={readingTime(post.body[locale])}
        minReadLabel={minReadLabel}
      />
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
    </article>
  );
}
