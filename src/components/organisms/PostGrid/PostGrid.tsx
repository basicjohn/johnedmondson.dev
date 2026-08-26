"use client";

import { useMemo, useState } from "react";
import type { Locale, Post } from "@/lib/types";
import ProjectCard from "@/components/molecules/ProjectCard/ProjectCard";
import Tag from "@/components/atoms/Tag/Tag";
import styles from "./PostGrid.module.scss";

type Props = {
  posts: Post[];
  locale: Locale;
  allLabel: string;
  emptyLabel: string;
};

export default function PostGrid({
  posts,
  locale,
  allLabel,
  emptyLabel,
}: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(
    () => [...new Set(posts.flatMap((p) => p.tags))].sort(),
    [posts],
  );

  const visible = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  if (!posts.length) {
    return <p className={styles.empty}>{emptyLabel}</p>;
  }

  return (
    <div>
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
      <div className={styles.grid}>
        {visible.map((post) => (
          <ProjectCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  );
}
