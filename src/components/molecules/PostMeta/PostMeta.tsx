import styles from "./PostMeta.module.scss";

type Props = {
  date: string; // pre-formatted for locale
  readingTime?: number;
  minReadLabel?: string;
  extra?: string;
};

export default function PostMeta({ date, readingTime, minReadLabel, extra }: Props) {
  return (
    <p className={styles.meta}>
      <time>{date}</time>
      {readingTime !== undefined && minReadLabel && (
        <>
          <span aria-hidden="true">·</span>
          <span>
            {readingTime} {minReadLabel}
          </span>
        </>
      )}
      {extra && (
        <>
          <span aria-hidden="true">·</span>
          <span>{extra}</span>
        </>
      )}
    </p>
  );
}
