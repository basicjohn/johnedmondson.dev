import CallToAction from "Components/CallToAction/CallToAction";
import styles from "./Home.module.scss";

const rootClass = "home-page";

const Home = () => {
  return (
    <div className={styles[rootClass]}>
      <section id="about" className={styles[`${rootClass}__about`]}>
        <h1>Hello</h1>
        <p>
          Life is changing fast in these modern economic times. It's time to
          build a future for myself and on my own terms. I'm currently
          moonlighting to build apps (3) to solve some of the challenges I've
          faced in my personal & professional life.
        </p>
      </section>
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
