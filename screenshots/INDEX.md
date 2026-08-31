# v2 page screenshots — 2026-08-31

Full-page captures of every page of johnedmondson.dev v2, for design review.

- Source: local production build (`npm run build`, static export in `out/`) at commit `1d8d46b` on `main`.
- **Not** captured from the live site: production currently serves the root language-chooser HTML for every URL because of a stale CRA-era SPA catch-all rewrite in the Amplify console.
- `desktop/`: 1440×900 viewport @2x. `mobile/`: 390×844 viewport @2x (emulated touch).
- Same filenames in both folders.

| File | URL | Notes |
| --- | --- | --- |
| 00-root-language-chooser | / | Fallback language chooser (noindex) |
| 01-en-home | /en | Home: hero, featured work, footer |
| 02-en-portfolio | /en/portfolio | Portfolio index |
| 03-en-portfolio-johnedmondson-dev-v2 | /en/portfolio/johnedmondson-dev-v2 | Portfolio detail (featured, 2026) |
| 04-en-portfolio-bold-reuse | /en/portfolio/bold-reuse | Portfolio detail (featured, 2025) |
| 05-en-portfolio-six-pillars | /en/portfolio/six-pillars | Portfolio detail (featured, 2024) |
| 06-en-portfolio-ion-channel | /en/portfolio/ion-channel | Portfolio detail (2023) |
| 07-en-writing | /en/writing | Writing index with tag filter |
| 08-en-writing-git-based-cms | /en/writing/git-based-cms | Writing detail |
| 09-en-writing-atomic-design-in-practice | /en/writing/atomic-design-in-practice | Writing detail |
| 10-en-contact | /en/contact | Contact form + scheduling card |
| 11-de-home | /de | German home (text-length check) |
| 12-de-portfolio | /de/portfolio | German portfolio index |
| 13-de-writing | /de/writing | German writing index |
| 14-de-contact | /de/contact | German contact |
| 15-de-portfolio-johnedmondson-dev-v2 | /de/portfolio/johnedmondson-dev-v2 | German portfolio detail |
| 16-en-404 | (any unknown path) | 404 page, bilingual |
