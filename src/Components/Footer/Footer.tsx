import React from "react";
import { Container, Typography } from "@material-ui/core";
import styles from "./Footer.module.scss";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} John Edmondson. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
