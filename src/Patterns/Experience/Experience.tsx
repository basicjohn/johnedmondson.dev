// dependencies
import React from "react";

// data
import experienceData from "../../data/experience.json";

// styles
import styles from "./Experience.module.scss";

const rootClass = "experience";

const Experience = () => (
  <section
    id="work"
    className={styles[rootClass]}
    aria-labelledby={`${rootClass}-heading`}
  >
    <div className={styles[`${rootClass}__header`]}>
      <h2 id={`${rootClass}-heading`} className={styles[`${rootClass}__label`]}>
        Work
      </h2>
      <p className={styles[`${rootClass}__note`]}>
        Problem, build, result. Most recent first.
      </p>
    </div>

    <ol className={styles[`${rootClass}__list`]}>
      {experienceData.roles.map((role) => (
        <li key={role.company} className={styles[`${rootClass}__role`]}>
          <div className={styles[`${rootClass}__meta`]}>
            <h3 className={styles[`${rootClass}__company`]}>{role.company}</h3>
            <p className={styles[`${rootClass}__engagement`]}>
              {role.engagement}
            </p>
            <p className={styles[`${rootClass}__dates`]}>{role.dates}</p>
          </div>
          <div className={styles[`${rootClass}__body`]}>
            <p className={styles[`${rootClass}__title`]}>{role.title}</p>
            <p className={styles[`${rootClass}__summary`]}>{role.summary}</p>
            <ul className={styles[`${rootClass}__highlights`]}>
              {role.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}

      {experienceData.earlier.map((role) => (
        <li
          key={role.company}
          className={`${styles[`${rootClass}__role`]} ${
            styles[`${rootClass}__role--condensed`]
          }`}
        >
          <div className={styles[`${rootClass}__meta`]}>
            <h3 className={styles[`${rootClass}__company`]}>{role.company}</h3>
            <p className={styles[`${rootClass}__dates`]}>{role.dates}</p>
          </div>
          <div className={styles[`${rootClass}__body`]}>
            <p className={styles[`${rootClass}__oneline`]}>
              <strong>{role.title}.</strong> {role.summary}
            </p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default Experience;
