import React, { useState } from "react";
import { API } from "aws-amplify";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  TextareaAutosize,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";

// data
import topics from "../../data/contact_topics.json";

// styles
import styles from "./ContactForm.module.scss";

interface ContactFormProps {
  onFormSubmit: () => void;
}

const rootClass = "contact-form";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be shorter than 50 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters long")
    .required("Message is required"),
  topic: Yup.string().required("Topic is required"),
});

// type Topic = {
//   value: string;
//   label: string;
// };

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
  topic: string;
}

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
  topic: "Follow the road less traveled",
};

const ContactForm: React.FC<ContactFormProps> = ({ onFormSubmit }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const onSubmit = async (values: ContactFormValues) => {
    try {
      await API.post("contactFormApi", "/submit", {
        body: values,
      });
      console.log("Form submitted successfully");
      setFormSubmitted(true);
      onFormSubmit(); // Call the function passed from the parent component
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
                  variant="outlined"
                  error={touched.topic && !!errors.topic}
                >
                  <InputLabel htmlFor="topic">Topic</InputLabel>
                  <Field name="topic">
                    {({ field }: FieldProps) => (
                      <Select
                        {...field}
                        label="Topic"
                        inputProps={{
                          name: "topic",
                          id: "topic",
                        }}
                      >
                        {topics.topicOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Field>
                  {touched.topic && errors.topic && (
                    <FormHelperText error>{errors.topic}</FormHelperText>
                  )}
                </FormControl>
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
              </Box>
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
