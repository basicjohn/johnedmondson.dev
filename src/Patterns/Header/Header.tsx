// dependencies
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

// components
import { Button, IconButton } from "@mui/material";
import {
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Pinterest as PinterestIcon,
} from "@mui/icons-material";

// assets
import { profilePhoto } from "assets";

// styles
import styles from "./Header.module.scss";

const rootClass = "header";

const Header = () => {
  const location = useLocation();

  const buttonText =
    location.pathname === "/contact" ? "Return Home" : "Message";
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
      <nav
        className={styles[`${rootClass}__social`]}
        aria-label="Social media links"
      >
        {/* LinkedIn */}
        <IconButton
          href="https://www.linkedin.com/in/johnedmondsondev/"
          target="_blank"
          rel="noreferrer"
          title="John's LinkedIn Profile"
          aria-label="LinkedIn icon"
          style={{ color: "#323232" }}
        >
          <LinkedInIcon />
        </IconButton>
        {/* GitHub */}
        <IconButton
          href="https://github.com/basicjohn"
          target="_blank"
          rel="noreferrer"
          title="John's GitHub Profile"
          aria-label="GitHub icon"
          style={{ color: "#323232" }}
        >
          <GitHubIcon />
        </IconButton>
        {/* Twitter */}
        <IconButton
          href="https://twitter.com/basicjohn"
          target="_blank"
          rel="noreferrer"
          title="John's X Profile"
          aria-label="X icon"
          style={{ color: "#323232" }}
        >
          <TwitterIcon />
        </IconButton>
        {/* Pinterest */}
        <IconButton
          href="https://www.pinterest.com/basicjohn/"
          target="_blank"
          rel="noreferrer"
          title="John's Pinterest Profile"
          aria-label="Pinterest icon"
          style={{ color: "#323232" }}
        >
          <PinterestIcon />
        </IconButton>
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
