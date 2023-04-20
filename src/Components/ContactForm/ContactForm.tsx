import React from "react";
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
import styles from "./ContactForm.module.scss";

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

type Topic = {
  value: string;
  label: string;
};

const topicOptions: Topic[] = [
  {
    value:
      "Let's talk code! - Share your favorite programming language, framework, or tool.",
    label:
      "Let's talk code! - Share your favorite programming language, framework, or tool.",
  },
  {
    value: "UX/UI Design Duel - What's your favorite design trend, and why?",
    label: "UX/UI Design Duel - What's your favorite design trend, and why?",
  },
  {
    value:
      "The Perfect Blend - How do you balance aesthetics and functionality in design?",
    label:
      "The Perfect Blend - How do you balance aesthetics and functionality in design?",
  },
  {
    value:
      "Creative Caffeine - Share your favorite sources of inspiration for development and design.",
    label:
      "Creative Caffeine - Share your favorite sources of inspiration for development and design.",
  },
  {
    value:
      "The Future of Interfaces - Discuss the next big thing in UX/UI design.",
    label:
      "The Future of Interfaces - Discuss the next big thing in UX/UI design.",
  },
  {
    value:
      "Coding Conundrums - Share your most challenging development problem and how you solved it.",
    label:
      "Coding Conundrums - Share your most challenging development problem and how you solved it.",
  },
  {
    value:
      "Design Disasters - Discuss a design fail and the lessons learned from it.",
    label:
      "Design Disasters - Discuss a design fail and the lessons learned from it.",
  },
  {
    value:
      "Collaboration Corner - How do you tackle teamwork in development and design projects?",
    label:
      "Collaboration Corner - How do you tackle teamwork in development and design projects?",
  },
  {
    value:
      "Portfolio Power-Up - Share tips on creating an outstanding developer/UX design portfolio.",
    label:
      "Portfolio Power-Up - Share tips on creating an outstanding developer/UX design portfolio.",
  },
  {
    value:
      "Tech Time Machine - If you could travel back in time, which tech innovation would you like to witness firsthand?",
    label:
      "Tech Time Machine - If you could travel back in time, which tech innovation would you like to witness firsthand?",
  },
  {
    value:
      "Accessibility Advocates - Share your experience in creating inclusive and accessible designs.",
    label:
      "Accessibility Advocates - Share your experience in creating inclusive and accessible designs.",
  },
  {
    value:
      "Virtual Ventures - Let's discuss the role of VR/AR in UX design and development.",
    label:
      "Virtual Ventures - Let's discuss the role of VR/AR in UX design and development.",
  },
  {
    value:
      "The AI Impact - How do you think AI will change the landscape of software development and UX design?",
    label:
      "The AI Impact - How do you think AI will change the landscape of software development and UX design?",
  },
  {
    value:
      "Mobile Mastery - Share your favorite mobile app design and what makes it stand out.",
    label:
      "Mobile Mastery - Share your favorite mobile app design and what makes it stand out.",
  },
];

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

const ContactForm: React.FC = () => {
  const onSubmit = async (values: ContactFormValues) => {
    try {
      await API.post("contactFormApi", "/submit", {
        body: values,
      });
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box className={styles[rootClass]}>
      <div>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Me
        </Typography>
      </div>
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
                      {topicOptions.map((option) => (
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
    </Box>
  );
};

export default ContactForm;
