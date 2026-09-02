import type { SocialLink } from "@/lib/types";
import styles from "./Footer.module.scss";

type FooterLabels = {
  availabilityHeading: string;
  availabilityText: string;
  resume: string;
  elsewhere: string;
  rights: string;
  builtWith: string;
};

type Props = {
  labels: FooterLabels;
  socials: SocialLink[];
  email: string;
  /** Public résumé PDF; the link is omitted until one is published */
  resume?: string;
};

export default function Footer({ labels, socials, email, resume }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Replaced a rotating quote and an empty newsletter signup. A
            current availability line and a plain address are the most
            useful thing a portfolio footer can carry. */}
        <div className={styles.availabilityCol}>
          <h2 className={styles.heading}>{labels.availabilityHeading}</h2>
          <p className={styles.text}>
            <span className={styles.dot} aria-hidden="true" />
            {labels.availabilityText}
          </p>
          <a className={styles.email} href={`mailto:${email}`}>
            {email}
          </a>
          {/* The one document a recruiter asks for, next to the address
              they would ask for it at. Rendered only once a scrubbed PDF
              exists at site.json's `resume` path. */}
          {resume && (
            <a className={styles.resume} href={resume}>
              {labels.resume}
            </a>
          )}
        </div>

        {/* Text links, not icon circles: the two links a hiring manager will
            actually follow should be legible at a glance. */}
        <div>
          <h2 className={styles.heading}>{labels.elsewhere}</h2>
          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.url}>
                <a
                  className={styles.socialLink}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.legal}`}>
        <p>
          © {new Date().getFullYear()} John Edmondson. {labels.rights}
        </p>
        <p>{labels.builtWith}</p>
      </div>
    </footer>
  );
}
