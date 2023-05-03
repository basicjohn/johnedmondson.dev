import styles from "./Home.module.scss";
import SkillTicker from "Components/SkillTicker/SkillTicker";
import Container from "Components/Container/Container";
import CallToAction from "Components/CallToAction/CallToAction";

const rootClass = "home-page";

const Home = () => {
  return (
    <>
      <Container>
        <div className={styles[rootClass]}>
          <section id="about" className={styles[`${rootClass}__about`]}>
            <h1>
              Hello, I'm John <br />
              <span>and I make things</span>
            </h1>
            <h2>Software Engineer & Maker</h2>
          </section>
        </div>
      </Container>
      <SkillTicker />
      <Container>
        <div className={styles[rootClass]}>
          {/* <section className={styles[`${rootClass}__skills`]}></section> */}
          <section id="portfolio" className={styles[`${rootClass}__portfolio`]}>
            <h1>Code Samples</h1>
            <h3>
              Animated background in the style of 90's geometric art using
              three.js
            </h3>
            <a
              href="https://codesandbox.io/p/sandbox/nifty-black-hqtk8p?file=%2Fsrc%2FApp.tsx&selection=%5B%7B%22endColumn%22%3A11%2C%22endLineNumber%22%3A11%2C%22startColumn%22%3A11%2C%22startLineNumber%22%3A11%7D%5D"
              target="_blank"
              rel="noreferrer"
            >
              CodeSandbox
            </a>
            <hr className={styles[`${rootClass}__short-rule`]} />
            <h3>Repository for johnedmondson.dev</h3>
            <a
              href="https://codesandbox.io/p/sandbox/nifty-black-hqtk8p?file=%2Fsrc%2FApp.tsx&selection=%5B%7B%22endColumn%22%3A11%2C%22endLineNumber%22%3A11%2C%22startColumn%22%3A11%2C%22startLineNumber%22%3A11%7D%5D"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
            <hr className={styles[`${rootClass}__short-rule`]} />
            <h3>
              Animated background in the style of 90's geometric art using
              three.js
            </h3>
            <a
              href="https://codesandbox.io/p/sandbox/nifty-black-hqtk8p?file=%2Fsrc%2FApp.tsx&selection=%5B%7B%22endColumn%22%3A11%2C%22endLineNumber%22%3A11%2C%22startColumn%22%3A11%2C%22startLineNumber%22%3A11%7D%5D"
              target="_blank"
              rel="noreferrer"
            >
              CodeSandbox
            </a>
            <hr className={styles[`${rootClass}__short-rule`]} />
          </section>
        </div>
        <CallToAction />
      </Container>
    </>
  );
};

export default Home;
