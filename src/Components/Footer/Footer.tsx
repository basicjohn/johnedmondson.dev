import React from "react";
import { Container, Typography } from "@mui/material";
import styles from "./Footer.module.scss";
import profilePhoto from "../../assets/profile_photo.png";
interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="xl">
        <div>
          <Typography variant="h3">Start the Conversation</Typography>
        </div>
        <div>
          <Typography variant="body1">
            If you're interested in working together or just want to say ‘Hi!’
          </Typography>
          <button>Let's Chat</button>
        </div>
      </Container>
      <Container maxWidth="xl">
        <div>
          <Typography variant="h4">Contact</Typography>
          <Typography variant="body2" align="right">
            John Edmondson <br />
            <a href="mailto:contact@johnedmondson.dev">
              contact@johnedmondson.dev
            </a>
          </Typography>
        </div>
        <div>
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
                &nbsp; John Edmondson
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
                &nbsp; basicjohn
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
                &nbsp; @basicjohn
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
                &nbsp; basicjohn
              </a>
            </li>
          </ul>
        </div>
        <div>
          <Typography variant="h4">Newsletter</Typography>
        </div>
        <div>
          <Typography variant="h4">Quote</Typography>
        </div>
      </Container>
      <Container maxWidth="xl">
        <img
          src={profilePhoto}
          alt="John Edmondson Ilustrated Icon"
          width="50px"
          height="50px"
        />
        <Typography variant="body1" align="right">
          &copy; {new Date().getFullYear()} John Edmondson. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
