import styles from "./Badge.module.scss";

type Props = {
  label: string;
  tone?: "neutral" | "accent" | "draft" | "success";
};

export default function Badge({ label, tone = "neutral" }: Props) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{label}</span>;
}
