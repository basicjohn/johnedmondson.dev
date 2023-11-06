// dependencies
import { Helmet } from "react-helmet";

// components
import { Button } from "@mui/material";
import ContactForm from "Patterns/ContactForm/ContactForm";

// styles
import styles from "./Contact.module.scss";

const rootClass = "contact-page";

const Contact = () => {
  return (
    <main className={styles[rootClass]}>
      <Helmet>
        <title>Contact John Edmondson</title>
        <meta
          name="description"
          content="Get in touch with John Edmondson, a Software Engineer based out of Portland, Oregon."
        />
      </Helmet>
      <h2>I hear you want to track me down...</h2>
      <h3>Here's where to start</h3>

      <h4>Schedule a meeting with me</h4>
      <span>
        <Button
          variant="contained"
          component="a"
          target="_blank"
          href="https://calendly.com/johnedmondsondev/lets-chat"
          rel="noreferrer"
          className={styles[`${rootClass}__button`]}
          aria-label="Schedule a meeting with John Edmondson on Calendly"
        >
          View Calendar
        </Button>{" "}
        on Calendly
      </span>
      <br />
      <h4>OR send me a message.</h4>
      <hr />
      <ContactForm />
    </main>
  );
};

export default Contact;
