import React from "react";
import { Container, Typography, Button } from "@mui/material";

import styles from "./Footer.module.scss";
import profilePhoto from "../../assets/profile_photo.png";

interface FooterProps {}

const rootClass = "footer";

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={styles[rootClass]}>
      <div className={styles[`${rootClass}__cta`]}>
        <div>
          <Typography variant="h3">Start the Conversation</Typography>
        </div>
        <div>
          <Typography variant="body1">
            If you're interested in working together or if you just want to say
            ‘Hi!’
          </Typography>
          <button>Let's Chat</button>
        </div>
      </div>
      <div className={styles[`${rootClass}__sections`]}>
        <div className={styles["contact"]}>
          <Typography variant="h4">Contact</Typography>
          <Typography variant="body2" align="left">
            John Edmondson <br />
            <a href="mailto:contact@johnedmondson.dev">
              contact@johnedmondson.dev
            </a>
          </Typography>
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
          <input></input>
          <button>Subscribe</button>
        </div>
        <div className={styles["inspiration"]}>
          <Typography variant="h4">Inspiration</Typography>
          <p>In feugiat arcu sed risus viverra, a luctus arcu pharetra.</p>
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
