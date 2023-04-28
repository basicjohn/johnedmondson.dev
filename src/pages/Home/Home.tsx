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

        <div className={styles[`${rootClass}__about__image`]}>
          <img src="https://via.placeholder.com/150" alt="John's face" />
        </div>

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
        <h1>Apps & Code Samples</h1>
        <button>Portfolio Item 1</button>
        <p>
          Content for Portfolio Item 1. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc nisl
        </p>
        <button>Portfolio Item 1</button>
        <p>
          Content for Portfolio Item 1. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc nisl
        </p>
        <button>Portfolio Item 1</button>
        <p>
          Content for Portfolio Item 1. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc nisl
        </p>
      </section>
      <CallToAction />
    </div>
  );
};

export default Home;
