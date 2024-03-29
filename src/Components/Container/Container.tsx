// dependencies
import React from "react";

// styles
import styles from "./Container.module.scss";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default Container;
