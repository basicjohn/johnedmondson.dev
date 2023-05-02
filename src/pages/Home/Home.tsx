import CallToAction from "Components/AnimatedBackground/AnimatedBackground";
import styles from "./Home.module.scss";
import SkillTicker from "Components/SkillTicker/SkillTicker";

const rootClass = "home-page";

const Home = () => {
  return (
    <div className={styles[rootClass]}>
      <section id="about" className={styles[`${rootClass}__about`]}>
        <h1>
          Hello I'm John <br />& I make things
        </h1>
        <h2>Maker, Software Engineer, and UI / UX Designer</h2>
        {/* 
        <div className={styles[`${rootClass}__about__image`]}>
          <img src="https://via.placeholder.com/150" alt="John's face" />
        </div> */}

        <p>
          Life is changing fast in these modern economic times. It's time to
          build a future for myself and on my own terms. I'm currently
          moonlighting to build apps (3) to solve some of the challenges I've
          faced in my personal & professional life.
        </p>
      </section>
      <SkillTicker />
      {/* <section className={styles[`${rootClass}__skills`]}></section> */}
      <section id="portfolio" className={styles[`${rootClass}__portfolio`]}>
        <h1>Code Samples</h1>
        F4B758
        <h3>
          Animated background in the style of 90's geometric art using three.js
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
      <CallToAction />
    </div>
  );
};

export default Home;
