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
          content="John Edmondson is a product-focused software engineer based in Freiburg, Germany, building data-driven systems that support real teams in production."
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
              I’m a product-focused software engineer who builds scalable,
              data-driven systems that support real teams in production —
              relational data models, APIs, and background processing alongside
              React and TypeScript frontends. A background in UX/UI design means
              I think through user experience, data integrity, and system
              reliability together rather than in isolation, and I’m most
              motivated by mission-driven work — lately, tools that support
              sustainability and waste reduction. Originally from Portland,
              Oregon, I’m now based in Freiburg, Germany, where I spend my free
              time traveling, doing house projects, and building apps to improve
              my day-to-day life — and I write about what I’m exploring over on
              my substack.
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
