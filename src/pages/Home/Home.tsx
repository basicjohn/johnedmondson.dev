// dependencies
import { Helmet } from "react-helmet";

// components
import Container from "Components/Container/Container";
import Experience from "Patterns/Experience/Experience";

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
          <Experience />
        </main>
      </Container>
    </>
  );
};

export default Home;
