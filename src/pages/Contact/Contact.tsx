import { Button } from "@mui/material";

import ContactForm from "Components/ContactForm/ContactForm";
import Greeting from "Components/Greeting/Greeting";

import styles from "./Contact.module.scss";

const rootClass = "contact-page";

const Contact = () => {
  return (
    <div className={styles[rootClass]}>
      <div className={styles[`${rootClass}__left-column`]}>
        <Greeting />
        <Button
          variant="contained"
          component="a"
          target="_blank"
          href="https://calendly.com/johnedmondsondev/lets-chat"
          rel="noreferrer"
          className={styles[`${rootClass}__button`]}
        >
          Schedule a Meeting
        </Button>
      </div>
      <div className={styles[`${rootClass}__right-column`]}>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
