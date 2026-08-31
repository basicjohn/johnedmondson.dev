import styles from "./FormField.module.scss";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
};

type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & { as?: "input" };
type TextAreaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };
type SelectProps = BaseProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    as: "select";
    children: React.ReactNode;
  };

type Props = InputProps | TextAreaProps | SelectProps;

export default function FormField(props: Props) {
  const { label, name, error, hint } = props;
  const required = Boolean(props.required);
  const id = `field-${name}`;
  const errorId = `${id}-error`;

  let control: React.ReactNode;
  if (props.as === "textarea") {
    const { label: _l, error: _e, hint: _h, as: _a, ...rest } = props;
    control = (
      <textarea
        id={id}
        className={styles.control}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
    );
  } else if (props.as === "select") {
    const { label: _l, error: _e, hint: _h, as: _a, children, ...rest } = props;
    control = (
      <select
        id={id}
        className={styles.control}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      >
        {children}
      </select>
    );
  } else {
    const {
      label: _l,
      error: _e,
      hint: _h,
      as: _a,
      ...rest
    } = props as InputProps;
    control = (
      <input
        id={id}
        className={styles.control}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
    );
  }

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {/* The input's required attribute carries the semantics; this is
            the visible mark. */}
        {required && (
          <span className={styles.requiredMark} aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {control}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
      {error && (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
