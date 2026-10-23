import BroadsheetShell from "./BroadsheetShell";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import type { ContactPageData } from "./contactData";
import { hasDescender } from "./typography";
import styles from "./Broadsheet.module.scss";
import projects from "./Projects.module.scss";
import page from "./Contact.module.scss";

/**
 * Contact as the Broadsheet sets it, light to dark: the title and intro on
 * the drafting grid, then the form and the details reversed out of the dark
 * ground, then the footer. (The live page's "Prefer to talk live?"
 * calendar panel is left out: John doesn't want visitors booking slots.)
 */
export default function ContactPage({ data }: { data: ContactPageData }) {
  const { labels } = data;

  return (
    <BroadsheetShell shell={data.shell} current="contact" flushFooter>
      <header className={projects.intro}>
        <div className="container">
          <h1
            className={`${projects.pageTitle} ${hasDescender(labels.title) ? projects.descends : ""}`}
          >
            {labels.title}
          </h1>
          <p className={projects.lede}>{labels.intro}</p>
        </div>
      </header>

      <div className={`${styles.inverse} ${page.formSection}`}>
        <div className={`container ${page.columns}`}>
          <ContactForm
            labels={labels}
            endpoint={data.endpoint}
            fallbackEmail={data.email}
          />
          <ContactDetails
            locale={data.locale}
            labels={labels}
            email={data.email}
            socials={data.socials}
          />
        </div>
      </div>
    </BroadsheetShell>
  );
}
