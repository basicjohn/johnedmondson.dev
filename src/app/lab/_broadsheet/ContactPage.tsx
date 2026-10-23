import BroadsheetShell from "./BroadsheetShell";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import type { ContactPageData } from "./contactData";
import styles from "./Broadsheet.module.scss";
import projects from "./Projects.module.scss";
import page from "./Contact.module.scss";

/**
 * Contact as the Broadsheet sets it, light to dark: the title and intro on
 * the drafting grid, the form and the details on the off-white sheet, then
 * the calendar as a dark band above the footer — the heaviest call to
 * action sits lowest, like the footer itself.
 */
export default function ContactPage({ data }: { data: ContactPageData }) {
  const { labels } = data;

  return (
    <BroadsheetShell shell={data.shell} current="contact">
      <header className={projects.intro}>
        <div className="container">
          <h1 className={projects.pageTitle}>{labels.title}</h1>
          <p className={projects.lede}>{labels.intro}</p>
        </div>
      </header>

      <div className={page.sheet}>
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

      <section
        className={`${styles.inverse} ${projects.dark} ${page.schedule}`}
        aria-labelledby="contact-schedule"
      >
        <div className={`container ${page.scheduleInner}`}>
          <div>
            <h2 id="contact-schedule" className={page.scheduleHeading}>
              {labels.scheduleHeading}
            </h2>
            <p className={page.scheduleText}>{labels.scheduleText}</p>
          </div>
          <a
            className={styles.ctaPrimary}
            href={data.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels.scheduleCta} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </BroadsheetShell>
  );
}
