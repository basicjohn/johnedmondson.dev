import { Button } from "@mui/material";

import ContactForm from "Components/ContactForm/ContactForm";
import Greeting from "Components/Greeting/Greeting";

import styles from "./Contact.module.scss";
import { useState } from "react";

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
      {hideElements! && <h2>OR get in touch now!</h2>}
      <Greeting />
      <ContactForm onFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default Contact;
