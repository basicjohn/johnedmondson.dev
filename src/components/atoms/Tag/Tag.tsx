import styles from "./Tag.module.scss";

type Props = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export default function Tag({ label, active = false, onClick }: Props) {
  const cls = [styles.tag, active && styles.active].filter(Boolean).join(" ");

  if (onClick) {
    return (
      <button
        type="button"
        className={cls}
        onClick={onClick}
        aria-pressed={active}
      >
        {label}
      </button>
    );
  }
  return <span className={cls}>{label}</span>;
}
