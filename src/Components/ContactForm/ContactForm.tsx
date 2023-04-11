import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define the validation schema
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be shorter than 50 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters long")
    .required("Message is required"),
});

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

const ContactForm: React.FC = () => {
  const onSubmit = (values: ContactFormValues) => {
    // Handle form submission, e.g., send data to API
    console.log(values);
  };

  return (
    <div>
      <h1>Contact Me</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" />
            </div>
            <div>
              <label htmlFor="message">Message:</label>
              <Field name="message" as="textarea" />
              <ErrorMessage name="message" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
