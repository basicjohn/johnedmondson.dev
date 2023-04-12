import styles from "./Contact.module.scss";

import ContactForm from "Components/ContactForm/ContactForm";
import Greeting from "Components/Greeting/Greeting";

const rootClass = "contact-page";

const Contact = () => {
  return (
    <div className={styles[rootClass]}>
      <div className={styles[`${rootClass}__left-column`]}>
        <Greeting />
      </div>
      <div className={styles[`${rootClass}__right-column`]}>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
