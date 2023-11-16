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
        </main>
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
          <h3>Student Projects from Coding Bootcamp</h3>
          <a
            href="https://github.com/basicjohn/lightification"
            target="_blank"
            rel="noreferrer"
            aria-label="Capstone project on GitHub"
          >
            Capstone Project
          </a>{" "}
          <a
            href="https://github.com/stars/basicjohn/lists/coding-bootcamp-solo-projects"
            target="_blank"
            rel="noreferrer"
            aria-label="Complete project list on GitHub"
          >
            Complete Project List
          </a>
          <hr className={styles[`${rootClass}__short-rule`]} />
          <h3>Codewars Coding Practice</h3>
          <a
            href="https://www.codewars.com/users/basicjohn/stats"
            target="_blank"
            rel="noreferrer"
            aria-label="Profile on Codewars"
          >
            Profile
          </a>
          <a
            href="https://www.codewars.com/users/basicjohn/completed"
            target="_blank"
            rel="noreferrer"
            aria-label="Completed Kata on Codewars"
          >
            Completed Kata
          </a>
          <a
            href="https://www.codewars.com/users/basicjohn/completed_solutions"
            target="_blank"
            rel="noreferrer"
            aria-label="Solutions on Codewars"
          >
            Solutions
          </a>
          <hr className={styles[`${rootClass}__short-rule`]} />
        </section>
        <CallToAction />
      </Container>
    </>
  );
};

export default Home;
