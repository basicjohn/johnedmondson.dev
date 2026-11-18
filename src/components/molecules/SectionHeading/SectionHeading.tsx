import Link from "next/link";
import styles from "./SectionHeading.module.scss";

type Props = {
  title: string;
  /** "01", "02": the section's number, in outline beside the title */
  number?: string;
  overline?: string;
  linkHref?: string;
  linkLabel?: string;
  /** For the section's aria-labelledby */
  id?: string;
};

/**
 * A section's head under a gold rule: the outlined number, the title, and
 * (for Projects) the "All projects" link — which drops to its own line on
 * phones, where the three don't fit across.
 */
export default function SectionHeading({
  title,
  number,
  overline,
  linkHref,
  linkLabel,
  id,
}: Props) {
  return (
    <div className={styles.wrapper} data-reveal="">
      {number && (
        <span className={styles.number} aria-hidden="true">
          {number}
        </span>
      )}
      <div>
        {overline && <p className={styles.overline}>{overline}</p>}
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
      </div>
      {linkHref && linkLabel && (
        <Link className={styles.link} href={linkHref}>
          {linkLabel} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
