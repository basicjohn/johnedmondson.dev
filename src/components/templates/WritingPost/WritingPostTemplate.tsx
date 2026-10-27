import Link from "next/link";
import type { Locale, Post } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { markdownToHtml } from "@/lib/markdown";
import { formatDate, readingTime } from "@/lib/utils";
import { tagLabel } from "@/lib/tags";
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

/**
 * An essay, light to dark like a project page: the title on the drafting
 * grid, the text on the off-white sheet, then more writing on the dark
 * ground above the footer.
 */
export default function WritingPostTemplate({
  post,
  related,
  locale,
  dict,
}: Props) {
  const html = markdownToHtml(post.body[locale]);

  return (
    <article>
      <header className={styles.intro}>
        <div className="container">
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
          <div className={styles.meta}>
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
          </div>
        </div>
      </header>

      <div className={styles.sheet}>
        <div className={`container ${styles.body}`}>
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

          {post.tags.length > 0 && (
            <ul className={styles.tags}>
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Tag label={tagLabel(tag, locale)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section
          className={`inverse ${styles.dark}`}
          aria-labelledby="related-heading"
        >
          <div className="container">
            <SectionHeading
              id="related-heading"
              title={dict.post.relatedWriting}
            />
            <div className={styles.relatedList}>
              {related.map((p) => (
                <PostCard
                  key={p.id}
                  post={p}
                  locale={locale}
                  minReadLabel={dict.post.minRead}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
