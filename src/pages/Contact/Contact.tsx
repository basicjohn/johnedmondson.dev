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
          content="Get in touch with John Edmondson, a product-focused software engineer based in Freiburg, Germany."
        />
      </Helmet>
      <ContactForm />
    </main>
  );
};

export default Contact;
