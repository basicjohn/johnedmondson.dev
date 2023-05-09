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
    <section>
      <h3>Start the Conversation</h3>
    </section>
    <section>
      <p>
        Please reach out if you're interested in working together or you just
        want to say ‘Hi!’...
      </p>
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button
          variant="contained"
          className={styles["cta-button"]}
          component={RouterLink}
          to="/contact"
        >
          Let's Chat!
        </Button>
      </Box>
    </section>
  </div>
);

export default CallToAction;
