"use client";

import { useMemo, useState } from "react";
import type { Locale, Post } from "@/lib/types";
import PostCard from "@/components/molecules/PostCard/PostCard";
import Tag from "@/components/atoms/Tag/Tag";
import { tagLabel } from "@/lib/tags";
import styles from "./PostList.module.scss";

type Props = {
  posts: Post[];
  locale: Locale;
  allLabel: string;
  emptyLabel: string;
  minReadLabel: string;
};

export default function PostList({
  posts,
  locale,
  allLabel,
  emptyLabel,
  minReadLabel,
}: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Same rule as the portfolio grid: a tag only earns a filter button once
  // it matches more than one post. With two posts and six distinct tags,
  // every button was a way to see less.
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      for (const tag of new Set(post.tags)) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts]
      .filter(([, count]) => count > 1)
      .map(([tag]) => tag)
      .sort();
  }, [posts]);

  const visible = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  if (!posts.length) {
    return <p className={styles.empty}>{emptyLabel}</p>;
  }

  return (
    <div className={styles.wrapper}>
      {tags.length > 1 && (
        <div className={styles.filters} role="group">
          <Tag
            label={allLabel}
            active={activeTag === null}
            onClick={() => setActiveTag(null)}
          />
          {tags.map((tag) => (
            <Tag
              key={tag}
              label={tagLabel(tag, locale)}
              active={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            />
          ))}
        </div>
      )}
      <div>
        {visible.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            locale={locale}
            minReadLabel={minReadLabel}
          />
        ))}
      </div>
    </div>
  );
}
