// styles
import styles from "./ComingSoon.module.scss";

const rootClass = "coming-soon";

const ComingSoon = () => (
  <div className={styles[rootClass]}>
    <h1>Oh hey, I'm looking for work!</h1>
    <p>
      I'm building a website for presenting my wares
      <br />
      ...therefore a portfolio site is coming soon.
    </p>

    <p className={styles[`${rootClass}__sneak-peek`]}>
      {" "}
      For those of you interested in seeing a sneak peek, you can view my
      progress <a href="https://github.com/basicjohn/johnedmondson.dev">HERE</a>
      .
    </p>
  </div>
);

export default ComingSoon;
