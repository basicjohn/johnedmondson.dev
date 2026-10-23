"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/markdown";
import styles from "./Projects.module.scss";

type Props = {
  label: string;
  headings: Heading[];
};

/**
 * "On this page" for a long case study, with the live TableOfContents'
 * behaviour: the section whose heading most recently crossed the band near
 * the top of the screen is marked as current.
 */
export default function Toc({ label, headings }: Props) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

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
      <h2 className={styles.asideHeading}>{label}</h2>
      <ol className={styles.tocList}>
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={h.id === active ? styles.tocActive : styles.tocLink}
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
