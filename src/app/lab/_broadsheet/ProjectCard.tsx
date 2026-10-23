import Link from "next/link";
import CoverMedia from "@/components/atoms/CoverMedia/CoverMedia";
import type { Project } from "../_shared/homeData";
import styles from "./Broadsheet.module.scss";

const SIZES = {
  feature: "(min-width: 1024px) 40rem, 100vw",
  card: "(min-width: 1024px) 32rem, (min-width: 768px) 50vw, 100vw",
  compact: "(min-width: 1024px) 22rem, (min-width: 768px) 50vw, 100vw",
};

type Props = {
  project: Project;
  /**
   * `feature`: the one large lead, image beside the text. `compact`: a
   * smaller card for rows of three (Other projects).
   */
  variant?: "default" | "feature" | "compact";
  /** Position in its row, for the staggered scroll reveal */
  index?: number;
};

/** A project as the Broadsheet sets it: image in a hard-shadowed frame,
 * then date, name, subhead, summary and tags. */
export default function ProjectCard({
  project,
  variant = "default",
  index = 0,
}: Props) {
  const cls = [
    styles.card,
    variant === "feature" && styles.feature,
    variant === "compact" && styles.compact,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={cls}
      data-reveal=""
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className={styles.media}>
        {project.cover ? (
          <CoverMedia
            className={styles.cover}
            cover={project.cover}
            video={project.coverVideo}
            alt=""
            sizes={SIZES[variant === "default" ? "card" : variant]}
          />
        ) : (
          <div className={styles.fallback} aria-hidden="true">
            <span>{project.initial}</span>
          </div>
        )}
      </div>
      <div className={styles.body}>
        {project.eyebrow && <p className={styles.eyebrow}>{project.eyebrow}</p>}
        <h3 className={styles.title}>
          {/* Stretched over the whole card, so the image is a target too */}
          <Link href={project.href}>{project.title}</Link>
        </h3>
        {project.subtitle && (
          <p className={styles.subtitle}>{project.subtitle}</p>
        )}
        <p className={styles.summary}>{project.summary}</p>
        {project.tags.length > 0 && (
          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
