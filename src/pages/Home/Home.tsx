// dependencies
import { Helmet } from "react-helmet";

// components
import Container from "Components/Container/Container";

// styles
import styles from "./Home.module.scss";

const rootClass = "home-page";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>John Edmondson - Product Engineer & Maker</title>
        <meta
          name="description"
          content="John Edmondson is a product-focused software engineer turning complex problems into reliable, thoughtful software, drawn to mission-driven work."
        />
      </Helmet>
      <Container>
        <main className={styles[rootClass]}>
          <section id="about" className={styles[`${rootClass}__about`]}>
            <h1>
              John Edmondson <br />
            </h1>
            <h2>Product Engineer & Maker</h2>
            <br />
            <p>
              Thanks for stopping by. I’m John, a product-focused software
              engineer who enjoys turning complex problems into reliable,
              thoughtful software. With a background in UX/UI design and
              experience across the full stack, I care about building products
              that are both technically sound and genuinely useful. I’m
              especially drawn to mission-driven work where good software can
              help people and organizations operate better and make a positive
              impact.
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
