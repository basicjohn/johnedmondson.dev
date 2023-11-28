// dependencies
import { Helmet } from "react-helmet";

// components
// import { Button } from "@mui/material";

// assets
import { ionChannel1a, ionChannel1b, ionChannel2, ionChannel3 } from "assets";

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
      <img width="100%" src={ionChannel1a} alt="" />
      <img width="100%" src={ionChannel1b} alt="" />
      <img width="100%" src={ionChannel2} alt="" />
      <img width="100%" src={ionChannel3} alt="" />
    </main>
  );
};

export default IonChannel;
