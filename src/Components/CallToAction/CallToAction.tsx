import React from "react";
import { Typography, Button, Box } from "@mui/material";

import styles from "./CallToAction.module.scss";

const rootClass = "cta";

const CallToAction = () => {
  return (
    <div className={styles[rootClass]}>
      <section>
        <h3>Start the Conversation</h3>
        {/* <Typography variant="h3">Start the Conversation</Typography> */}
      </section>
      <section>
        <Typography variant="body1" align="right">
          If you're interested in working together or if you just want to say
          ‘Hi!’..
        </Typography>
        <Box
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            variant="contained"
            color="primary"
            className={styles["cta-button"]}
          >
            Let's Chat!
          </Button>
        </Box>
      </section>
    </div>
  );
};

export default CallToAction;
