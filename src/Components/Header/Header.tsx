// dependencies
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

// components
import { Button } from "@mui/material";

// assets
import {
  profilePhoto,
  githubIcon,
  linkedinIcon,
  pinterestIcon,
  twitterIcon,
} from "assets";

// styles
import styles from "./Header.module.scss";

const rootClass = "header";

const Header = () => {
  const location = useLocation();

  const buttonText =
    location.pathname === "/contact" ? "Go Back" : "Let's Chat!";
  const buttonLink = location.pathname === "/contact" ? "/" : "/contact";
  const buttonAriaLabel =
    location.pathname === "/contact"
      ? "Go back to homepage"
      : "Go to contact page";

  return (
    <div className={styles[rootClass]} role="banner">
      <div className={styles[`${rootClass}__logo`]}>
        <RouterLink to="/">
          <img
            src={profilePhoto}
            alt="Illustrated icon of John Edmondson"
            width="60px"
            height="60px"
          />
        </RouterLink>
      </div>
      <nav className={styles[`${rootClass}__social`]} aria-label="Social media links">
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/johnedmondsondev/"
          target="_blank"
          rel="noreferrer"
          title="John's LinkedIn"
        >
          <img src={linkedinIcon} alt="LinkedIn" width="24px" height="24px" />
        </a>
        {/* GitHub */}
        <a href="https://github.com/basicjohn" target="_blank" rel="noreferrer" title="John's GitHub">
          <img src={githubIcon} alt="GitHub" width="24px" height="24px" />
        </a>
        {/* Twitter */}
        <a
          href="https://twitter.com/basicjohn"
          target="_blank"
          rel="noreferrer"
          title="John's Twitter"
        >
          <img src={twitterIcon} alt="Twitter" width="24px" height="24px" />
        </a>
        {/* Pinterest */}
        <a
          href="https://www.pinterest.com/basicjohn/"
          target="_blank"
          rel="noreferrer"
          title="John's Pinterest"
        >
          <img src={pinterestIcon} alt="Pinterest" width="24px" height="24px" />
        </a>
      </nav>
      <div className={styles[`${rootClass}__contact`]}>
        <Button
          variant="contained"
          className={styles["contact-button"]}
          component={RouterLink}
          to={buttonLink}
          aria-label={buttonAriaLabel}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Header;
