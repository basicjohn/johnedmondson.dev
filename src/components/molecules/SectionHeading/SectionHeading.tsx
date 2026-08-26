import Link from "next/link";
import styles from "./SectionHeading.module.scss";

type Props = {
  title: string;
  overline?: string;
  linkHref?: string;
  linkLabel?: string;
};

export default function SectionHeading({ title, overline, linkHref, linkLabel }: Props) {
  return (
    <div className={styles.wrapper}>
      <div>
        {overline && <p className={styles.overline}>{overline}</p>}
        <h2 className={styles.title}>{title}</h2>
      </div>
      {linkHref && linkLabel && (
        <Link className={styles.link} href={linkHref}>
          {linkLabel} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
