"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/markdown";
import styles from "./TableOfContents.module.scss";

type Props = {
  label: string;
  headings: Heading[];
};

/**
 * "On this page" for long case studies. Lives in the sticky fact sheet,
 * which otherwise has nothing to do once the reader scrolls past it.
 * Highlights the section currently at the top of the viewport.
 */
export default function TableOfContents({ label, headings }: Props) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    // The section whose heading most recently crossed the top band wins;
    // rootMargin keeps that band under the sticky header.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className={styles.toc} aria-label={label}>
      <h2 className={styles.heading}>{label}</h2>
      <ol className={styles.list}>
        {headings.map((h) => (
          <li
            key={h.id}
            className={h.level === 3 ? styles.itemNested : styles.item}
          >
            <a
              href={`#${h.id}`}
              className={h.id === active ? styles.linkActive : styles.link}
              aria-current={h.id === active ? "location" : undefined}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
