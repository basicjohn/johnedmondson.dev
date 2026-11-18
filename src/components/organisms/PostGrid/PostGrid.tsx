"use client";

import { useMemo, useState } from "react";
import type { Locale, Post } from "@/lib/types";
import ProjectCard from "@/components/molecules/ProjectCard/ProjectCard";
import Tag from "@/components/atoms/Tag/Tag";
import { tagLabel } from "@/lib/tags";
import { PORTFOLIO_TAG_FILTER } from "@/lib/config";
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

  // Only tags that actually filter — a tag on a single post would just
  // reproduce that post's card with extra steps.
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
  const [lead, grid] = activeTag
    ? [undefined, visible]
    : [visible[0], visible.slice(1)];

  if (!posts.length) {
    return <p className={styles.empty}>{emptyLabel}</p>;
  }

  return (
    <div>
      {PORTFOLIO_TAG_FILTER && tags.length > 1 && (
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
      {/* Unfiltered, the first project leads as a spread and the rest sit
          two by two beneath it; a filtered set is just the grid. */}
      {lead && <ProjectCard post={lead} locale={locale} variant="feature" />}
      {grid.length > 0 && (
        <div className={`${styles.grid} ${lead ? styles.afterLead : ""}`}>
          {grid.map((post, i) => (
            <ProjectCard
              key={post.id}
              post={post}
              locale={locale}
              index={i % 2}
            />
          ))}
        </div>
      )}
    </div>
  );
}
