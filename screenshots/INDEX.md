# v2 page screenshots — 2026-09-01

Full-page captures of every page of johnedmondson.dev v2, for design review.

- Source: local production build (`npm run build`, static export in `out/`) at commit `90faae5` on `main`.
- `desktop/`: 1440×900 viewport @2x. `mobile/`: 390×844 viewport @2x (emulated touch).
- Exception: the four `*-six-pillars` files are @1x — the page is ~13.5k CSS px tall, and Chromium's full-page capture silently wraps back to the top beyond ≈14k device px, so @2x cannot capture it in one piece.
- Same filenames in both folders.
- Complete bilingual set this time: every EN and every DE page, all published posts. Draft posts (13 essays + 1 portfolio piece) are excluded from the static export and have no pages to capture.
- `00-root-language-chooser` was captured with JavaScript disabled — with JS on, the page's inline locale redirect forwards to `/en` before first paint, which is the intended behavior for real visitors.

| File | URL | Notes |
| --- | --- | --- |
| 00-root-language-chooser | / | No-JS fallback language chooser (noindex) |
| 01-en-home | /en | Home: hero with headshot, featured work, footer |
| 02-en-portfolio | /en/portfolio | Portfolio index |
| 03-en-portfolio-johnedmondson-dev-v2 | /en/portfolio/johnedmondson-dev-v2 | Portfolio detail (featured, 2026) |
| 04-en-portfolio-bold-reuse | /en/portfolio/bold-reuse | Portfolio detail (featured, 2025) |
| 05-en-portfolio-six-pillars | /en/portfolio/six-pillars | Portfolio detail (featured, 2024; image-heavy, ~15k CSS px tall) |
| 06-en-portfolio-ion-channel | /en/portfolio/ion-channel | Portfolio detail (2023) |
| 07-en-writing | /en/writing | Writing index with tag filter |
| 08-en-writing-git-based-cms | /en/writing/git-based-cms | Writing detail |
| 09-en-writing-atomic-design-in-practice | /en/writing/atomic-design-in-practice | Writing detail |
| 10-en-contact | /en/contact | Contact form + scheduling card |
| 11-de-home | /de | German home (text-length check) |
| 12-de-portfolio | /de/portfolio | German portfolio index |
| 13-de-portfolio-johnedmondson-dev-v2 | /de/portfolio/johnedmondson-dev-v2 | German portfolio detail |
| 14-de-portfolio-bold-reuse | /de/portfolio/bold-reuse | German portfolio detail |
| 15-de-portfolio-six-pillars | /de/portfolio/six-pillars | German portfolio detail |
| 16-de-portfolio-ion-channel | /de/portfolio/ion-channel | German portfolio detail |
| 17-de-writing | /de/writing | German writing index |
| 18-de-writing-git-based-cms | /de/writing/git-based-cms | German writing detail |
| 19-de-writing-atomic-design-in-practice | /de/writing/atomic-design-in-practice | German writing detail |
| 20-de-contact | /de/contact | German contact |
| 21-en-404 | (any unknown path) | 404 page, bilingual |
