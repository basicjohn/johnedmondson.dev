import { Button } from "@mui/material";

import ContactForm from "Components/ContactForm/ContactForm";
import Greeting from "Components/Greeting/Greeting";

import styles from "./Contact.module.scss";

const rootClass = "contact-page";

const Contact = () => {
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
      <h2>OR get in touch now!</h2>
      <Greeting />
      <ContactForm />
    </div>
  );
};

export default Contact;
