"use client";

import { useEffect } from "react";

// The lab variants' motion switch, on the same pattern as the live home
// page's GridIntro: the inline script runs while the HTML is still parsing,
// so load animations (pure CSS, keyed on html[data-lab-motion]) start with
// the first paint instead of waiting for hydration. Without JavaScript, or
// with reduced motion preferred, the attribute is never set and every
// element simply renders in place.
const ARM = `if (matchMedia("(prefers-reduced-motion: no-preference)").matches) document.documentElement.setAttribute("data-lab-motion", "");`;

/**
 * Scroll reveals and the pointer spotlight.
 *
 * `[data-reveal]` elements are only hidden once `data-lab-ready` is set,
 * and that happens here, after hydration, having first marked everything
 * already on screen `data-shown="static"` — so nothing visible ever blinks
 * out, and a page whose script fails keeps all of its content. Elements
 * scrolled to later get `data-shown="in"`, which is what the stylesheets
 * animate.
 *
 * `[data-spotlight]` elements receive the pointer position as --mx/--my.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-lab-motion")) return;

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
    root.setAttribute("data-lab-ready", "");

    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const el = target?.closest?.<HTMLElement>("[data-spotlight]");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      root.removeAttribute("data-lab-motion");
      root.removeAttribute("data-lab-ready");
    };
  }, []);

  return <script dangerouslySetInnerHTML={{ __html: ARM }} />;
}
