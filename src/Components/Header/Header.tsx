import React from "react";
import { Box, Button } from "@mui/material";

import profilePhoto from "../../assets/profile_photo.png";
import styles from "./Header.module.scss";

const rootClass = "header";

const Header = () => {
  return (
    <>
      <div className={styles[rootClass]}>
        <div className={styles[`${rootClass}__logo`]}>
          <img
            src={profilePhoto}
            alt="John Edmondson Ilustrated Icon"
            width="60px"
            height="60px"
          />
        </div>
        <div className={styles[`${rootClass}__social`]}>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/johnedmondsondev/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.icons8.com/color/48/000000/linkedin.png"
              alt="LinkedIn"
              width="24px"
              height="24px"
            />
          </a>
          {/* GitHub */}
          <a
            href="
                  https://github.com/basicjohn
                "
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.icons8.com/fluent/48/000000/github.png"
              alt="GitHub"
              width="24px"
              height="24px"
            />
          </a>
          {/* Twitter */}
          <a
            href="https://twitter.com/basicjohn"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.icons8.com/fluent/48/000000/twitter.png"
              alt="Twitter"
              width="24px"
              height="24px"
            />
          </a>
          {/* Pinterest */}
          <a
            href="https://www.pinterest.com/basicjohn/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.icons8.com/fluent/48/000000/pinterest.png"
              alt="Pinterest"
              width="24px"
              height="24px"
            />
          </a>
        </div>
        <div className={styles[`${rootClass}__contact`]}>
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
        </div>
      </div>
      <hr />
    </>
  );
};

export default Header;
