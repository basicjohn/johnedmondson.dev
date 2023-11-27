// dependencies
import { Helmet } from "react-helmet";

// components
// import { Button } from "@mui/material";

// styles
import styles from "./NonContactTech.module.scss";

const rootClass = "non-contact-tech-page";

const NonContactTech = () => {
  return (
    <main className={styles[rootClass]}>
      <Helmet>
        <title>Portfolio - Non-Contact Technologies</title>
        <meta name="description" content="" />
      </Helmet>
      <h1>Non-Contact Technologies</h1>
    </main>
  );
};

export default NonContactTech;
