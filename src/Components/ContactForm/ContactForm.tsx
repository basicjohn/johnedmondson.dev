// dependencies
import React, { useState } from "react";
import { API } from "aws-amplify";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";

// components
import {
  TextField,
  Button,
  Box,
  Typography,
  TextareaAutosize,
  FormControl,
  FormHelperText,
} from "@mui/material";

// styles
import styles from "./ContactForm.module.scss";

const rootClass = "contact-form";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

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

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

const ContactForm: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const onSubmit = async (values: ContactFormValues) => {
    console.log("Submitting form with values:", values);
    try {
      await API.post("contactFormApi", "/submit", {
        body: values,
      });
      console.log("Form submitted successfully");
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box className={styles[rootClass]}>
      {!formSubmitted ? (
        <Formik
          initialValues={initialValues}
          validationSchema={ContactSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box marginBottom={2}>
                <Field name="name">
                  {({ field }: FieldProps) => (
                    <TextField
                      label="Name"
                      variant="outlined"
                      fullWidth
                      {...field}
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  )}
                </Field>
              </Box>
              <Box marginBottom={2}>
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      {...field}
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  )}
                </Field>
              </Box>
              <Box marginBottom={2}>
                <FormControl
                  fullWidth
                  error={touched.message && !!errors.message}
                >
                  <label htmlFor="message">Message:</label>
                  <Field name="message">
                    {({ field }: FieldProps) => (
                      <TextareaAutosize
                        {...field}
                        id="message"
                        minRows={4}
                        className={`${styles[`${rootClass}__message`]} ${
                          touched.message && errors.message ? styles.error : ""
                        }`}
                      />
                    )}
                  </Field>
                  {touched.message && errors.message && (
                    <FormHelperText error>{errors.message}</FormHelperText>
                  )}
                </FormControl>
              </Box>{" "}
              <Button
                type="submit"
                variant="contained"
                className={styles[`${rootClass}__submit-button`]}
                sx={{
                  backgroundColor: "#323232",
                  fontWeight: "700",
                  textTransform: "capitalize",
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <Typography variant="h4" component="h1" gutterBottom>
          Thank you for your message!
        </Typography>
      )}
    </Box>
  );
};

export default ContactForm;