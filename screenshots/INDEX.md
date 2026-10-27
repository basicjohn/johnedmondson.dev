# Broadsheet page screenshots — 2026-10-27

Full-page captures of every page of johnedmondson.dev in the Broadsheet
design, for review before launch. They replace the 2026-09-01 v2 set.

- Source: local production build (`npm run build`, static export in `out/`) at commit `a785c75` on branch `feat/broadsheet`, served with Amplify-style `.html` rewrites.
- `desktop/`: 1440×900 viewport @2x. `mobile/`: 390×844 viewport @2x (emulated touch).
- Exception: the `*-six-pillars` and `*-top-shot-reloaded` files are @1x. Those pages are 7.6k–13.2k CSS px tall, and Chromium's full-page capture wraps back to the top beyond about 14k device px, so @2x can't capture them in one piece.
- Captured with reduced motion on: the ticker is a still band and nothing waits to be revealed. The header is unpinned so it appears once, at the top.
- Same filenames in both folders.
- Every EN and DE page, all published posts. Drafts are left out of the static export, so they have no pages to capture.
- `00-root-language-chooser` was captured with JavaScript disabled. With JS on, the page's inline locale redirect forwards to `/en` before first paint, which is what real visitors get.

| File                                    | URL                                    | Notes                                                       |
| --------------------------------------- | -------------------------------------- | ----------------------------------------------------------- |
| 00-root-language-chooser                | /                                      | No-JS fallback language chooser (noindex)                   |
| 01-en-home                              | /en                                    | Home: hero, ticker, 01 Projects and 02 About on dark        |
| 02-en-portfolio                         | /en/portfolio                          | Projects list: lead feature card, then the grid             |
| 03-en-portfolio-johnedmondson-dev-v2    | /en/portfolio/johnedmondson-dev-v2     | Project page                                                |
| 04-en-portfolio-bold-reuse              | /en/portfolio/bold-reuse               | Project page without a cover                                |
| 05-en-portfolio-six-pillars             | /en/portfolio/six-pillars              | Project page, image-heavy, with the outline in the aside    |
| 06-en-portfolio-ion-channel             | /en/portfolio/ion-channel              | Project page                                                |
| 07-en-writing                           | /en/writing                            | Writing list (hidden from the nav, reachable by URL)        |
| 08-en-writing-git-based-cms             | /en/writing/git-based-cms              | Essay                                                       |
| 09-en-writing-atomic-design-in-practice | /en/writing/atomic-design-in-practice  | Essay                                                       |
| 10-en-contact                           | /en/contact                            | Contact: form and details on dark (no calendar card)        |
| 11-de-home                              | /de                                    | German home (text-length check)                             |
| 12-de-portfolio                         | /de/portfolio                          | German projects list                                        |
| 13-de-portfolio-johnedmondson-dev-v2    | /de/portfolio/johnedmondson-dev-v2     | German project page                                         |
| 14-de-portfolio-bold-reuse              | /de/portfolio/bold-reuse               | German project page                                         |
| 15-de-portfolio-six-pillars             | /de/portfolio/six-pillars              | German project page                                         |
| 16-de-portfolio-ion-channel             | /de/portfolio/ion-channel              | German project page                                         |
| 17-de-writing                           | /de/writing                            | German writing list                                         |
| 18-de-writing-git-based-cms             | /de/writing/git-based-cms              | German essay                                                |
| 19-de-writing-atomic-design-in-practice | /de/writing/atomic-design-in-practice  | German essay                                                |
| 20-de-contact                           | /de/contact                            | German contact                                              |
| 21-en-404                               | (any unknown path)                     | 404: outlined numeral on a screen-filling grid, bilingual   |
| 22-en-portfolio-top-shot-reloaded       | /en/portfolio/top-shot-reloaded        | Project page (new since the 2026-09-01 set)                 |
| 23-de-portfolio-top-shot-reloaded       | /de/portfolio/top-shot-reloaded        | German project page                                         |
