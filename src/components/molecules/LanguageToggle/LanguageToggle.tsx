"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/types";
import styles from "./LanguageToggle.module.scss";

type Props = {
  locale: Locale;
  label: string;
};

export default function LanguageToggle({ locale, label }: Props) {
  const pathname = usePathname() ?? `/${locale}`;

  const pathFor = (target: Locale) => {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  return (
    <nav className={styles.toggle} aria-label={label}>
      {locales.map((l) => (
        <Link
          key={l}
          href={pathFor(l)}
          className={l === locale ? styles.active : styles.option}
          aria-current={l === locale ? "true" : undefined}
          onClick={() => {
            document.cookie = `locale=${l};path=/;max-age=31536000`;
          }}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
