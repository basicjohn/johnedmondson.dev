import { Button } from "@mui/material";

import ContactForm from "Components/ContactForm/ContactForm";
import Greeting from "Components/Greeting/Greeting";

import styles from "./Contact.module.scss";
import { useState } from "react";

// Images
import githubIcon from "../../assets/icons/github-48.png";
import linkedinIcon from "../../assets/icons/linkedin-48.png";
import pinterestIcon from "../../assets/icons/pinterest-48.png";
import twitterIcon from "../../assets/icons/twitter-48.png";
import AnimatedBackground from "Components/AnimatedBackground/AnimatedBackground";

const rootClass = "contact-page";

const Contact = () => {
  const [hideElements, setHideElements] = useState(false);

  const handleFormSubmit = () => {
    setHideElements(true);
  };
  return (
    <div className={styles[rootClass]}>
      <h2>I can sometimes be a hard one to track down.</h2>
      <h3>Here's where to start...</h3>
      <h5>Follow me on the socials</h5>
      <div className={styles[`${rootClass}__social`]}>
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/johnedmondsondev/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedinIcon} alt="LinkedIn" width="24px" height="24px" />
        </a>
        {/* GitHub */}
        <a href="https://github.com/basicjohn" target="_blank" rel="noreferrer">
          <img src={githubIcon} alt="GitHub" width="24px" height="24px" />
        </a>
        {/* Twitter */}
        <a
          href="https://twitter.com/basicjohn"
          target="_blank"
          rel="noreferrer"
        >
          <img src={twitterIcon} alt="Twitter" width="24px" height="24px" />
        </a>
        {/* Pinterest */}
        <a
          href="https://www.pinterest.com/basicjohn/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={pinterestIcon} alt="Pinterest" width="24px" height="24px" />
        </a>
      </div>

      <h5>Schedule a meeting</h5>
      <span>
        <Button
          variant="contained"
          component="a"
          target="_blank"
          href="https://calendly.com/johnedmondsondev/lets-chat"
          rel="noreferrer"
          className={styles[`${rootClass}__button`]}
        >
          View Calendar
        </Button>{" "}
        on Calendly
      </span>
      {hideElements! ? <h2>OR get in touch now!</h2> : null}
      <Greeting />
      <ContactForm onFormSubmit={handleFormSubmit} />
      <AnimatedBackground />
    </div>
  );
};

export default Contact;
