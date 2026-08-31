"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/types";
import LanguageToggle from "@/components/molecules/LanguageToggle/LanguageToggle";
import { WRITING_SECTION_PUBLIC } from "@/lib/config";
import styles from "./Header.module.scss";

type NavLabels = {
  label: string;
  home: string;
  portfolio: string;
  writing: string;
  contact: string;
  menuOpen: string;
  menuClose: string;
};

type Props = {
  locale: Locale;
  nav: NavLabels;
  languageLabel: string;
};

export default function Header({ locale, nav, languageLabel }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "";

  const links = [
    { href: `/${locale}`, label: nav.home, exact: true },
    { href: `/${locale}/portfolio`, label: nav.portfolio },
    ...(WRITING_SECTION_PUBLIC
      ? [{ href: `/${locale}/writing`, label: nav.writing }]
      : []),
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link
          href={`/${locale}`}
          className={styles.logo}
          onClick={() => setOpen(false)}
        >
          {/* Decorative — the wordmark beside it carries the name */}
          <img
            className={styles.avatar}
            src="/images/john-avatar-64.png"
            alt=""
            width={32}
            height={32}
          />
          <span>
            John Edmondson<span className={styles.logoDot}>.</span>
          </span>
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">
            {open ? nav.menuClose : nav.menuOpen}
          </span>
          <span
            className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>
        </button>

        <div
          id="site-nav"
          className={`${styles.navWrap} ${open ? styles.navOpen : ""}`}
        >
          <nav className={styles.nav} aria-label={nav.label}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive(link.href, link.exact)
                    ? styles.activeLink
                    : styles.link
                }
                aria-current={
                  isActive(link.href, link.exact) ? "page" : undefined
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <LanguageToggle locale={locale} label={languageLabel} />
        </div>
      </div>
    </header>
  );
}
