"use client";

import { useEffect } from "react";

// The motion switch. The inline script runs while the HTML is still
// parsing, so load animations (pure CSS, keyed on html[data-motion]) start
// with the first paint instead of waiting for hydration. Without
// JavaScript, or with reduced motion preferred, the attribute is never set
// and every element simply renders in place.
const ARM = `if (matchMedia("(prefers-reduced-motion: no-preference)").matches) document.documentElement.setAttribute("data-motion", "");`;

/**
 * Scroll reveals for `[data-reveal]` elements (styles in globals.scss).
 *
 * They are only hidden once `data-motion-ready` is set, and that happens
 * here, after hydration, having first marked everything already on screen
 * `data-shown="static"` — so nothing visible ever blinks out, and a page
 * whose script fails keeps all of its content. Elements scrolled to later
 * get `data-shown="in"`, which is what animates.
 *
 * React does not run inline scripts on client-side navigation, so arriving
 * by a link plays no load animation; the cleanup clears both attributes so
 * nothing carries over to the next page.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-motion")) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const el of els) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.setAttribute("data-shown", "static");
      } else {
        io.observe(el);
      }
    }
    root.setAttribute("data-motion-ready", "");

    return () => {
      io.disconnect();
      root.removeAttribute("data-motion");
      root.removeAttribute("data-motion-ready");
    };
  }, []);

  return <script dangerouslySetInnerHTML={{ __html: ARM }} />;
}
