// dependencies
import { Helmet } from "react-helmet";

// components
// import { Button } from "@mui/material";

// styles
import styles from "./IonChannel.module.scss";

const rootClass = "ion-channel-page";

const IonChannel = () => {
  return (
    <main className={styles[rootClass]}>
      <Helmet>
        <title>Portfolio - Non-Contact Technologies</title>
        <meta name="description" content="" />
      </Helmet>
      <h1>Ion Channel</h1>
    </main>
  );
};

export default IonChannel;
