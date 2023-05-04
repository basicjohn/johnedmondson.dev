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
            </h1>
            <h2>I make things</h2>
            <h3>Software Engineer & Maker</h3>
            <p>
              I’m a Software Engineer based out of Portland, Oregon. I like to
              spend my free time traveling, doing house projects, and building
              apps to improve my day-to-day life. I regularly talk about my
              thoughts and explorations over on my substack.
            </p>
          </section>
        </div>
        {/* <h2>Skills</h2> */}
      </Container>

      <SkillTicker />
      <Container>
        <section id="portfolio" className={styles[`${rootClass}__portfolio`]}>
          <h2>Apps & Portfolio</h2>
          <h3>The John Edmondson Official Website</h3>
          <a
            href="https://github.com/basicjohn/johnedmondson.dev"
            target="_blank"
            rel="noreferrer"
          >
            Repository
          </a>
          <hr className={styles[`${rootClass}__short-rule`]} />
          <h3>90's Style Animated Background</h3>
          <a
            href="https://codesandbox.io/p/sandbox/nifty-black-hqtk8p?file=%2Fsrc%2FApp.tsx&selection=%5B%7B%22endColumn%22%3A11%2C%22endLineNumber%22%3A11%2C%22startColumn%22%3A11%2C%22startLineNumber%22%3A11%7D%5D"
            target="_blank"
            rel="noreferrer"
          >
            CodeSandbox
          </a>
          <hr className={styles[`${rootClass}__short-rule`]} />
          <h3>Student Projects from Coding Bootcamp</h3>
          <a
            href="https://github.com/basicjohn/mr-robogers"
            target="_blank"
            rel="noreferrer"
          >
            Mr Robogers
          </a>{" "}
          <a
            href="https://github.com/basicjohn/currency-exchanger"
            target="_blank"
            rel="noreferrer"
          >
            Currency Exchanger
          </a>{" "}
          <a
            href="https://github.com/basicjohn/language-suggester"
            target="_blank"
            rel="noreferrer"
          >
            Language Suggester
          </a>
          <a
            href="https://github.com/stars/basicjohn/lists/coding-bootcamp-solo-projects"
            target="_blank"
            rel="noreferrer"
          >
            Complete Project List
          </a>
          <hr className={styles[`${rootClass}__short-rule`]} />
        </section>
        <CallToAction />
      </Container>
    </>
  );
};

export default Home;
