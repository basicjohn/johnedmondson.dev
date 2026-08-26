"use client";

import { useMemo, useState } from "react";
import type { Locale, Post } from "@/lib/types";
import PostCard from "@/components/molecules/PostCard/PostCard";
import Tag from "@/components/atoms/Tag/Tag";
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

  const tags = useMemo(
    () => [...new Set(posts.flatMap((p) => p.tags))].sort(),
    [posts]
  );

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
              label={tag}
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
