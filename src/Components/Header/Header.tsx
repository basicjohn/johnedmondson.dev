import React from "react";
// import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
// Images
import profilePhoto from "../../assets/profile_photo.png";
import githubIcon from "../../assets/icons/github-48.png";
import linkedinIcon from "../../assets/icons/linkedin-48.png";
import pinterestIcon from "../../assets/icons/pinterest-48.png";
import twitterIcon from "../../assets/icons/twitter-48.png";

// Styles
import styles from "./Header.module.scss";
import { Box, Button } from "@mui/material";

const rootClass = "header";

const Header = () => {
  return (
    <>
      <div className={styles[rootClass]} role="banner">
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
            <img src={linkedinIcon} alt="LinkedIn" width="24px" height="24px" />
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/basicjohn"
            target="_blank"
            rel="noreferrer"
          >
            <img src={githubIcon} alt="GitHub" width="24px" height="24px" />
          </a>
          {/* Twitter */}
          <a
            href="https://twitter.com/basicjohn"
            target="_blank"
            rel="noreferrer"
          >
            <img src={twitterIcon} alt="Twitter" width="24px" height="24px" />
          </a>
          {/* Pinterest */}
          <a
            href="https://www.pinterest.com/basicjohn/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={pinterestIcon}
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
              className={styles["cta-button"]}
              component={RouterLink}
              to="/contact"
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
