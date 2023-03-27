import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@mui/icons-material";
import styles from "./Header.module.scss";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className={styles.header}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={styles.title}>
            Portfolio
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
