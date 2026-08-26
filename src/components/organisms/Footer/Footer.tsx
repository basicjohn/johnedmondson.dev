import type { Quote, SocialLink } from "@/lib/types";
import QuoteBlock from "@/components/molecules/QuoteBlock/QuoteBlock";
import SocialIcon from "@/components/atoms/SocialIcon/SocialIcon";
import Button from "@/components/atoms/Button/Button";
import styles from "./Footer.module.scss";

type FooterLabels = {
  newsletterHeading: string;
  newsletterText: string;
  newsletterCta: string;
  elsewhere: string;
  rights: string;
  builtWith: string;
};

type Props = {
  labels: FooterLabels;
  socials: SocialLink[];
  quotes: Quote[];
  newsletterUrl: string;
};

export default function Footer({ labels, socials, quotes, newsletterUrl }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.quoteCol}>
          <QuoteBlock quotes={quotes} />
        </div>

        <div>
          <h2 className={styles.heading}>{labels.newsletterHeading}</h2>
          <p className={styles.text}>{labels.newsletterText}</p>
          <Button variant="secondary" href={newsletterUrl} external>
            {labels.newsletterCta}
          </Button>
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
