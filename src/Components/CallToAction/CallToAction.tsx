// dependencies
import React from "react";

// components
import { Link as RouterLink } from "react-router-dom";
import { Button, Box } from "@mui/material";

// styles
import styles from "./CallToAction.module.scss";

const rootClass = "cta";

const CallToAction = () => (
  <div className={styles[rootClass]}>
    <section aria-label="Start the Conversation">
      <h2>Start the Conversation</h2>
    </section>
    <section aria-label="Call to action">
      <p>
        Please reach out if you're interested in working together or if you just
        want to say ‘Hi!’...
      </p>
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button
          variant="contained"
          className={styles["cta-button"]}
          component={RouterLink}
          to="/contact"
          aria-label="Navigate to contact page"
        >
          Let's Chat!
        </Button>
      </Box>
    </section>
    <hr aria-label="Horizontal separator" />
  </div>
);

export default CallToAction;
