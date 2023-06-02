// dependencies
import { Helmet } from "react-helmet";

// components
import { Button } from "@mui/material";
import ContactForm from "Components/ContactForm/ContactForm";
import Greeting from "Components/Greeting/Greeting";

// assets
import { githubIcon, linkedinIcon, pinterestIcon, twitterIcon } from "assets";

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
      <h4>Find me on the socials</h4>
      <div className={styles[`${rootClass}__social`]}>
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/johnedmondsondev/"
          target="_blank"
          rel="noreferrer"
          aria-label="John Edmondson's LinkedIn profile"
        >
          <img src={linkedinIcon} alt="LinkedIn" width="24px" height="24px" />
        </a>
        {/* GitHub */}
        <a
          href="https://github.com/basicjohn"
          target="_blank"
          rel="noreferrer"
          aria-label="John Edmondson's GitHub profile"
        >
          <img src={githubIcon} alt="GitHub" width="24px" height="24px" />
        </a>
        {/* Twitter */}
        <a
          href="https://twitter.com/basicjohn"
          target="_blank"
          rel="noreferrer"
          aria-label="John Edmondson's Twitter profile"
        >
          <img src={twitterIcon} alt="Twitter" width="24px" height="24px" />
        </a>
        {/* Pinterest */}
        <a
          href="https://www.pinterest.com/basicjohn/"
          target="_blank"
          rel="noreferrer"
          aria-label="John Edmondson's Pinterest profile"
        >
          <img src={pinterestIcon} alt="Pinterest" width="24px" height="24px" />
        </a>
      </div>

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
      <hr />
      <Greeting />
      <ContactForm />
    </main>
  );
};

export default Contact;
