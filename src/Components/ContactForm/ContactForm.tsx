// Components
import { useFormik } from "formik";

// Styles
import styles from "./ComingSoon.module.scss";

const rootClass = "contact-form";

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      inquiryType: "",
      message: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const inquiryTypes = ["General Inquiry", "Job Inquiry", "Other"];

  return (
    <div className={styles[rootClass]}>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="inquiryType">Inquiry Type</label>
        <select
          id="inquiryType"
          name="inquiryType"
          onChange={formik.handleChange}
          value={formik.values.inquiryType}
        >
          <option value="" label="Select an inquiry type" />
          {inquiryTypes.map((inquiryType) => (
            <option value={inquiryType} label={inquiryType} />
          ))}
        </select>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
