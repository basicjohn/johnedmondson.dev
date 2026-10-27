import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import LabHeader from "../_shared/LabHeader";
import Motion from "../_shared/Motion";
import type { ShellData } from "../_shared/homeData";
import styles from "./Broadsheet.module.scss";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-broadsheet",
});

// Fraunces is for display sizes only. Small, functional type — the role,
// labels, dates, tags — is set in Plex Mono, which holds up at 13px and
// gives the serif an engineer's counterpart.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-broadsheet-mono",
});

type Props = {
  shell: ShellData;
  /** Which nav item is this page */
  current?: "home" | "portfolio" | "contact" | "none";
  /**
   * For a page that ends on a light section: no dark gap above the footer,
   * so the sheet meets the footer's marigold stripe directly.
   */
  flushFooter?: boolean;
  children: React.ReactNode;
};

/**
 * The frame every Broadsheet page shares: the fonts and tokens, the fixed
 * header, and the near-black footer. Pages fill <main>, and run from light
 * at the top to dark at the bottom so the footer lands as the heaviest
 * block.
 */
export default function BroadsheetShell({
  shell,
  current = "home",
  flushFooter = false,
  children,
}: Props) {
  const { footer } = shell;

  return (
    <div className={`${display.variable} ${mono.variable} ${styles.root}`}>
      <Motion />
      <a className="skip-link" href="#main">
        {shell.common.skipToContent}
      </a>
      <LabHeader
        classes={styles}
        locale={shell.locale}
        labels={{ ...shell.nav, language: shell.common.languageLabel }}
        links={shell.links}
        current={current}
      />

      <main id="main">{children}</main>

      <footer
        className={`${styles.footer} ${flushFooter ? styles.footerFlush : ""}`}
      >
        <div className={`container ${styles.footerGrid}`}>
          <div>
            <h2 className={styles.footerHeading}>
              {footer.availabilityHeading}
            </h2>
            <p className={styles.availabilityText}>
              <span className={styles.dot} aria-hidden="true" />
              {footer.availabilityText}
            </p>
            <a className={styles.email} href={`mailto:${shell.email}`}>
              {shell.email}
            </a>
            {shell.resume && (
              <a className={styles.resume} href={shell.resume}>
                {footer.resume}
              </a>
            )}
          </div>
          <div>
            <h2 className={styles.footerHeading}>{footer.elsewhere}</h2>
            <ul className={styles.socials}>
              {shell.socials.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`container ${styles.legal}`}>
          <p>
            © {new Date().getFullYear()} John Edmondson. {footer.rights}
          </p>
          <p>{footer.builtWith}</p>
        </div>
      </footer>
    </div>
  );
}
