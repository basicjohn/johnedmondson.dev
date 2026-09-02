"use client";

import { useEffect } from "react";

// The site's one moment of motion: on a fresh load of the home page the
// drafting grid fades up and the portrait settles onto it (keyframes in
// globals.scss and Hero.module.scss). The inline script runs while the HTML
// is still parsing, so the attribute is set before first paint — no flash of
// a finished grid that then restarts. React does not execute inline scripts
// on client-side navigation, so arriving via a link plays nothing, and the
// effect below clears the attribute on the way out so it never repeats on
// another page. Users who prefer reduced motion get the static grid.
const INTRO = `if (matchMedia("(prefers-reduced-motion: no-preference)").matches) document.documentElement.setAttribute("data-grid-intro", "");`;

export default function GridIntro() {
  useEffect(
    () => () => document.documentElement.removeAttribute("data-grid-intro"),
    [],
  );
  return <script dangerouslySetInnerHTML={{ __html: INTRO }} />;
}
