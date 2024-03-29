// dependencies
import { Helmet } from "react-helmet";

// components
import SkillTicker from "Components/SkillTicker/SkillTicker";
import Container from "Components/Container/Container";
import CallToAction from "Components/CallToAction/CallToAction";

// styles
import styles from "./Home.module.scss";

const rootClass = "home-page";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>John Edmondson - Software Engineer & Maker</title>
        <meta
          name="description"
          content="John Edmondson is a Software Engineer based out of Portland, Oregon. He spends his free time traveling, doing house projects, and building apps."
        />
      </Helmet>
      <Container>
        <main className={styles[rootClass]}>
          <section id="about" className={styles[`${rootClass}__about`]}>
            <h1>
              John Edmondson <br />
            </h1>
            <h2>Software Engineer & Maker</h2>
            <br />
            <p>
              I’m a Software Engineer based out of Portland, Oregon. I like to
              spend my free time traveling, doing house projects, and building
              apps to improve my day-to-day life. I regularly talk about my
              thoughts and explorations over on my substack.
            </p>
          </section>
          <section id="portfolio" className={styles[`${rootClass}__portfolio`]}>
            <h2>Projects</h2>
            <h3>Portfolio Site Resources</h3>
            <a
              href="https://github.com/basicjohn/johnedmondson.dev"
              target="_blank"
              rel="noreferrer"
              aria-label="John Edmondson official website repository"
            >
              Repository
            </a>{" "}
            <a
              href="https://codesandbox.io/p/sandbox/nifty-black-hqtk8p?file=%2Fsrc%2FApp.tsx&selection=%5B%7B%22endColumn%22%3A11%2C%22endLineNumber%22%3A11%2C%22startColumn%22%3A11%2C%22startLineNumber%22%3A11%7D%5D"
              target="_blank"
              rel="noreferrer"
              aria-label="90's Style Animated Background on CodeSandbox"
            >
              Animated Background on CodeSandbox
            </a>
            <hr className={styles[`${rootClass}__short-rule`]} />
          </section>
        </main>
      </Container>
    </>
  );
};

export default Home;
