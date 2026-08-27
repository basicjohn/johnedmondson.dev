import type { SocialLink } from "@/lib/types";
import SocialIcon from "@/components/atoms/SocialIcon/SocialIcon";
import styles from "./Footer.module.scss";

type FooterLabels = {
  availabilityHeading: string;
  availabilityText: string;
  elsewhere: string;
  rights: string;
  builtWith: string;
};

type Props = {
  labels: FooterLabels;
  socials: SocialLink[];
  email: string;
};

export default function Footer({ labels, socials, email }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Replaced a rotating quote and an empty newsletter signup. A
            current availability line and a plain address are the most
            useful thing a portfolio footer can carry. */}
        <div className={styles.availabilityCol}>
          <h2 className={styles.heading}>{labels.availabilityHeading}</h2>
          <p className={styles.text}>{labels.availabilityText}</p>
          <a className={styles.email} href={`mailto:${email}`}>
            {email}
          </a>
        </div>

        <div>
          <h2 className={styles.heading}>{labels.elsewhere}</h2>
          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.url}>
                <SocialIcon label={social.label} url={social.url} />
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
