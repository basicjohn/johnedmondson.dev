// Styles
import styles from "./ComingSoon.module.scss";

const rootClass = "coming-soon";

const ComingSoon = () => (
  <div className={styles[rootClass]}>
    <h1>Oh Hey, I'm looking for work!</h1>
    <p>
      Therefore I'm building a website to show off my wares
      <br />
      ..portfolio site coming soon.
    </p>
    <a href="mailto:contact@johnedmondson.dev">Contact</a> |{" "}
    <a href="https://twitter.com/basicjohn">Twitter</a> |{" "}
    <a href="https://github.com/basicjohn">Github</a> |{" "}
    <a href="https://www.linkedin.com/in/johnedmondsondev/">LinkedIn</a>
    <p className={styles[`${rootClass}__sneak-peak`]}></p>
  </div>
);

export default ComingSoon;
