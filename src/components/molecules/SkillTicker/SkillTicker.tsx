import styles from "./SkillTicker.module.scss";

type Props = {
  skills: string[];
  heading: string;
};

export default function SkillTicker({ skills, heading }: Props) {
  // Duplicate the list so the CSS marquee loops seamlessly
  const loop = [...skills, ...skills];

  return (
    <section className={styles.ticker} aria-label={heading}>
      <div className={styles.track}>
        {loop.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className={styles.item}
            aria-hidden={i >= skills.length}
          >
            {skill}
            <span className={styles.dot} aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
