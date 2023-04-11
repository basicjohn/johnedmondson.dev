import React from "react";
import { Typography, Button, Box } from "@mui/material";

import styles from "./Footer.module.scss";
import profilePhoto from "../../assets/profile_photo.png";
import InspirationalQuote from "Components/InspirationalQuote/InspirationalQuote";

interface FooterProps {}

const rootClass = "footer";

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={styles[rootClass]}>
      <div className={styles[`${rootClass}__cta`]}>
        <section>
          <Typography variant="h3">Start the Conversation</Typography>
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
      <div className={styles[`${rootClass}__sections`]}>
        <div className={styles["navigation"]}>
          <Typography variant="h4">Nav</Typography>
          <ul className={styles["footer-nav"]}>
            <li>
              <a href="#">Introduction</a>
            </li>
            <li>
              <a href="#">Apps & Portfolio</a>
            </li>

            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <br />A blog is in the works..
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
                  src="https://img.icons8.com/fluent/48/000000/twitter.png"
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
          width="50px"
          height="50px"
        />
        <Typography variant="body1" align="right">
          &copy; {new Date().getFullYear()} John Edmondson. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
