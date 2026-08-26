import type { Metadata } from "next";
import Link from "next/link";
import styles from "./admin.module.scss";

export const metadata: Metadata = {
  title: "CMS · John Edmondson",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link href="/admin" className={styles.logo}>
            CMS<span className={styles.logoDot}>.</span>
          </Link>
          <nav className={styles.nav}>
            <Link href="/admin">Posts</Link>
            <Link href="/admin/new">+ New post</Link>
            <Link href="/en" target="_blank">
              View site ↗
            </Link>
          </nav>
        </div>
      </header>
      <main className={`container ${styles.main}`}>{children}</main>
    </div>
  );
}
