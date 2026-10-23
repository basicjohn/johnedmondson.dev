import Link from "next/link";
import styles from "./lab.module.scss";

const OPTIONS = [
  {
    name: "Current",
    note: "The live home page, for comparison.",
    href: (locale: string) => `/${locale}`,
  },
  {
    name: "A — Signal",
    note: "Dark and tech-forward: blueprint grid, bento project grid, pointer spotlight, status-console Now band.",
    href: (locale: string) => `/lab/${locale}/signal`,
  },
  {
    name: "B — Broadsheet",
    note: "Bold editorial on the existing paper and gold — the chosen direction, refining against planning/taste-profile.md.",
    href: (locale: string) => `/lab/${locale}/broadsheet`,
  },
];

export default function LabIndex() {
  return (
    <main className={`container ${styles.index}`}>
      <h1>Home page redesigns</h1>
      <p className={styles.lede}>
        Same elements, same copy, same projects — only the presentation changes.
        Dev only; none of this is in the static export.
      </p>
      <ul className={styles.list}>
        {OPTIONS.map((option) => (
          <li key={option.name} className={styles.item}>
            <h2>{option.name}</h2>
            <p>{option.note}</p>
            <p className={styles.links}>
              <Link href={option.href("en")}>English</Link>
              <Link href={option.href("de")}>Deutsch</Link>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
