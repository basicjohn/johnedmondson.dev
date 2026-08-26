import Link from "next/link";
import type { Locale, Post } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { markdownToHtml } from "@/lib/markdown";
import { formatDate, readingTime } from "@/lib/utils";
import Badge from "@/components/atoms/Badge/Badge";
import Tag from "@/components/atoms/Tag/Tag";
import PostMeta from "@/components/molecules/PostMeta/PostMeta";
import PostCard from "@/components/molecules/PostCard/PostCard";
import SectionHeading from "@/components/molecules/SectionHeading/SectionHeading";
import styles from "./WritingPostTemplate.module.scss";

type Props = {
  post: Post;
  related: Post[];
  locale: Locale;
  dict: Dictionary;
};

export default function WritingPostTemplate({
  post,
  related,
  locale,
  dict,
}: Props) {
  const html = markdownToHtml(post.body[locale]);

  return (
    <article className={`container ${styles.article}`}>
      <header className={styles.header}>
        <Link className={styles.back} href={`/${locale}/writing`}>
          ← {dict.post.backToWriting}
        </Link>
        {post.status === "draft" && (
          <p className={styles.draftNotice}>
            <Badge label={dict.common.draft} tone="draft" />{" "}
            {dict.post.draftNotice}
          </p>
        )}
        <h1 className={styles.title}>{post.title[locale]}</h1>
        <PostMeta
          date={formatDate(post.date, locale)}
          readingTime={readingTime(post.body[locale])}
          minReadLabel={dict.post.minRead}
          extra={
            post.updated
              ? `${dict.post.updatedOn} ${formatDate(post.updated, locale)}`
              : undefined
          }
        />
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

      {post.tags.length > 0 && (
        <ul className={styles.tags}>
          {post.tags.map((tag) => (
            <li key={tag}>
              <Tag label={tag} />
            </li>
          ))}
        </ul>
      )}

      {related.length > 0 && (
        <section className={styles.related}>
          <SectionHeading title={dict.post.related} />
          {related.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              locale={locale}
              minReadLabel={dict.post.minRead}
            />
          ))}
        </section>
      )}
    </article>
  );
}
