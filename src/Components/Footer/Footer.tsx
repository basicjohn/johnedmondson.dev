// dependencies
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography } from "@mui/material";

// components
import CallToAction from "Components/CallToAction/CallToAction";
import InspirationalQuote from "Components/InspirationalQuote/InspirationalQuote";

// images
import { profilePhoto } from "assets";

// styles
import styles from "./Footer.module.scss";

const rootClass = "footer";

const Footer = () => {
  return (
    <>
      <footer className={styles[rootClass]}>
        <div className={styles[`${rootClass}__sections`]}>
          <div className={styles["navigation"]}>
            <Typography variant="h4">Links</Typography>
            <ul className={styles["footer-nav"]}>
              <li>
                <RouterLink to="/beta#about">About</RouterLink>
              </li>
              <li>
                <RouterLink to="/beta#portfolio">Apps & Portfolio</RouterLink>
              </li>
              <li>
                <RouterLink to="/contact">Contact</RouterLink>
              </li>
              <li>
                <br />
                <a
                  target="_blank"
                  href="https://calendly.com/johnedmondsondev/lets-chat"
                  rel="noreferrer"
                >
                  Schedule Appointment
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://github.com/basicjohn/johnedmondson.dev"
                  rel="noreferrer"
                >
                  View Repository
                </a>
              </li>
            </ul>
          </div>
          <div className={styles["social"]}>
            <Typography variant="h4">Social</Typography>
            <ul>
              <li>
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
                  <span>&nbsp; John Edmondson</span>
                </a>
              </li>
              <li>
                {/* GitHub */}
                <a
                  href="https://github.com/basicjohn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://img.icons8.com/fluent/48/323232/github.png"
                    alt="GitHub"
                    width="24px"
                    height="24px"
                  />
                  <span>&nbsp; basicjohn</span>
                </a>
              </li>
              <li>
                {/* Twitter */}
                <a
                  href="https://twitter.com/basicjohn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://img.icons8.com/fluent/48/323232/twitter.png"
                    alt="Twitter"
                    width="24px"
                    height="24px"
                  />
                  <span>&nbsp; @basicjohn</span>
                </a>
              </li>
              <li>
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
                  <span>&nbsp; basicjohn</span>
                </a>
              </li>
            </ul>
          </div>
          <div className={styles["newsletter"]}>
            <Typography variant="h4">Newsletter</Typography>
            <iframe
              title="Newsletter"
              className={styles["signup"]}
              src="https://basicjohn.substack.com/embed"
              width="100%"
              height="120px"
            ></iframe>
          </div>
          <div className={styles["inspiration"]}>
            <InspirationalQuote />
          </div>
        </div>
        <div className={styles[`${rootClass}__copyright`]}>
          <img
            src={profilePhoto}
            alt="John Edmondson Ilustrated Icon"
            width="40px"
            height="40px"
          />
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
