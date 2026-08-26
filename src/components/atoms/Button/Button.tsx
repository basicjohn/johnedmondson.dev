import Link from "next/link";
import styles from "./Button.module.scss";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

type AsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type Props = AsButton | AsLink;

export default function Button(props: Props) {
  const { variant = "primary", children, className } = props;
  const cls = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          className={cls}
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={props.href}>
        {children}
      </Link>
    );
  }

  const {
    variant: _v,
    className: _c,
    children: _ch,
    ...rest
  } = props as AsButton;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
