import React from "react";
import { Button, Box } from "@mui/material";

import styles from "./CallToAction.module.scss";

const rootClass = "cta";

const CallToAction = () => {
  return (
    <>
      <hr />
      <div className={styles[rootClass]}>
        <section>
          <h3>Start the Conversation</h3>
        </section>
        <section>
          <p>
            If you're interested in working together or if you just want to say
            ‘Hi!’..
          </p>
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
    </>
  );
};

export default CallToAction;
