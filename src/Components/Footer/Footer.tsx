// dependencies
import React from "react";

// components
import { Link as RouterLink } from "react-router-dom";
import { Typography } from "@mui/material";

// data
import InspirationalQuote from "Components/InspirationalQuote/InspirationalQuote";

// assets
import { profilePhoto } from "assets";

// styles
import styles from "./Footer.module.scss";

const rootClass = "footer";

const Footer = () => {
  return (
    <>
      <footer className={styles[rootClass]}>
        <div className={styles[`${rootClass}__sections`]}>
          <nav role="navigation" aria-label="Footer Links" className={styles["navigation"]}>
            <Typography variant="h4">Links</Typography>
            <ul className={styles["footer-nav"]}>
              <li>
                <RouterLink to="/#about" aria-label="About Page">About</RouterLink>
              </li>
              <li>
                <RouterLink to="/#portfolio" aria-label="Portfolio Page">Apps & Portfolio</RouterLink>
              </li>
              <li>
                <RouterLink to="/contact" aria-label="Contact Page">Contact</RouterLink>
              </li>
              <li>
                <br />
                <a
                  target="_blank"
                  href="https://calendly.com/johnedmondsondev/lets-chat"
                  rel="noreferrer"
                  title="Schedule an appointment on Calendly"
                  aria-label="Schedule an appointment on Calendly"
                >
                  Schedule Appointment
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://github.com/basicjohn/johnedmondson.dev"
                  rel="noreferrer"
                  title="View repository on GitHub"
                  aria-label="View repository on GitHub"
                >
                  View Repository
                </a>
              </li>
            </ul>
          </nav>
          <div role="contentinfo" aria-label="Social Media Links" className={styles["social"]}>
            <Typography variant="h4">Social</Typography>
            {/* insert ul and li elements here */}
          </div>
          <div role="complementary" aria-label="Newsletter Subscription" className={styles["newsletter"]}>
            <Typography variant="h4">Newsletter</Typography>
            <iframe
              title="Newsletter"
              className={styles["signup"]}
              src="https://basicjohn.substack.com/embed"
              width="100%"
              height="120px"
            ></iframe>
          </div>
          <div role="complementary" aria-label="Inspirational Quote" className={styles["inspiration"]}>
            <InspirationalQuote />
          </div>
        </div>
        <div className={styles[`${rootClass}__copyright`]}>
          <RouterLink to="/">
            <img
              src={profilePhoto}
              alt="Illustrated icon of John Edmondson"
              width="40px"
              height="40px"
            />
          </RouterLink>
          <Typography variant="body1" align="right">
            &copy; {new Date().getFullYear()} John Edmondson. All rights
            reserved.
          </Typography>
        </div>
      </footer>
    </>
  );
};

export default Footer;