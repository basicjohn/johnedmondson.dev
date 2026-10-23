"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { locales, type Locale } from "@/lib/types";

type Props = {
  /** The variant's stylesheet: header, solid, inner, logo, avatar, logoDot,
   * menuButton, burger, burgerOpen, navWrap, navOpen, nav, link, activeLink,
   * toggle, toggleOption, toggleActive */
  classes: Record<string, string>;
  locale: Locale;
  labels: {
    label: string;
    home: string;
    portfolio: string;
    contact: string;
    menuOpen: string;
    menuClose: string;
    language: string;
  };
  links: {
    home: string;
    portfolio: string;
    contact: string;
    locales: Record<Locale, string>;
  };
  /** Which nav item is the current page; Home unless a page says otherwise */
  current?: "home" | "portfolio";
};

/**
 * The live Header's behaviour (scroll-solid bar, burger below tablet width,
 * the same links and language switch) with the styling handed in, so each
 * variant can dress it differently.
 */
export default function LabHeader({
  classes: c,
  locale,
  labels,
  links,
  current = "home",
}: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const items = [
    { href: links.home, label: labels.home, current: current === "home" },
    {
      href: links.portfolio,
      label: labels.portfolio,
      current: current === "portfolio",
    },
    { href: links.contact, label: labels.contact, current: false },
  ];

  return (
    <header className={`${c.header} ${scrolled || open ? c.solid : ""}`}>
      <div className={`container ${c.inner}`}>
        <Link
          href={links.home}
          className={c.logo}
          onClick={() => setOpen(false)}
        >
          <img
            className={c.avatar}
            src="/images/john-avatar-128.png"
            alt=""
            width={48}
            height={48}
          />
          <span>
            John Edmondson<span className={c.logoDot}>.</span>
          </span>
        </Link>

        <button
          type="button"
          className={c.menuButton}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">
            {open ? labels.menuClose : labels.menuOpen}
          </span>
          <span
            className={`${c.burger} ${open ? c.burgerOpen : ""}`}
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>
        </button>

        <div id="site-nav" className={`${c.navWrap} ${open ? c.navOpen : ""}`}>
          <nav className={c.nav} aria-label={labels.label}>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={item.current ? c.activeLink : c.link}
                aria-current={item.current ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <nav className={c.toggle} aria-label={labels.language}>
            {locales.map((l) => (
              <Link
                key={l}
                href={links.locales[l]}
                className={l === locale ? c.toggleActive : c.toggleOption}
                aria-current={l === locale ? "true" : undefined}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
