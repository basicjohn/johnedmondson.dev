import Link from "next/link";
import BroadsheetShell from "./BroadsheetShell";
import type { NotFoundPageData } from "./notFoundData";
import styles from "./Broadsheet.module.scss";
import page from "./NotFound.module.scss";

/**
 * The 404 as the Broadsheet sets it: a poster-size outlined "404" in the
 * section numbers' style, the title, one line, and the three places worth
 * going next — all on the drafting grid, which fills the screen so the
 * footer never floats halfway up a short page.
 */
export default function NotFoundPage({ data }: { data: NotFoundPageData }) {
  const { labels, links } = data;

  return (
    <BroadsheetShell shell={data.shell} current="none" flushFooter>
      <section className={page.page}>
        <div className={`container ${page.inner}`}>
          <p className={page.code} aria-hidden="true">
            404
          </p>
          <h1 className={page.title}>{labels.title}</h1>
          <p className={page.text}>{labels.text}</p>
          <div className={page.actions}>
            <Link className={styles.ctaPrimary} href={links.home}>
              {labels.backHome} <span aria-hidden="true">→</span>
            </Link>
            <Link className={styles.ctaSecondary} href={links.portfolio}>
              {labels.projects}
            </Link>
            <Link className={styles.ctaSecondary} href={links.contact}>
              {labels.contact}
            </Link>
          </div>
        </div>
      </section>
    </BroadsheetShell>
  );
}
