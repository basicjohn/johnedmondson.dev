import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import styles from "./Header.module.scss";
import SectionTitle from "../SectionTitle/SectionTitle";

interface HeaderProps {
  currentTitle: string;
}

const Header: React.FC<HeaderProps> = ({ currentTitle }) => {
  return (
    <div className={styles.header}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            <SectionTitle title={currentTitle} />
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
