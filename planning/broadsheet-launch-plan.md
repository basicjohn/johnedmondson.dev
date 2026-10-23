# Moving the Broadsheet design onto the live site

Plan written 2026-10-23. Goal: replace the live site's look with the
Broadsheet design (home, projects list, project pages) without a
half-old, half-new site ever being live, and without losing anything the
current pages do. Design rules live in `planning/taste-profile.md`.

## Where things stand

- **Designed in the lab** (dev-only, never in the static export): home,
  projects list, project pages, in English and German. Code in
  `src/app/lab/_broadsheet/` and `src/app/lab/_shared/`.
- **Not designed yet**, but the new header and footer will wrap them:
  Contact, the 404 page, and Writing. Writing is hidden from the nav
  (`WRITING_SECTION_PUBLIC = false`) but still built and reachable by URL.
- **Local `main` is one commit ahead of the live site** (`5f3b4ec`, not
  pushed). It holds the "Projects" naming, the project subheads, the lab
  and the taste profile. Checked 2026-10-23: `npm run build` succeeds, the
  export has no lab or admin pages, and project pages show the subheads
  with "Name — Subhead" titles.

## Approach

1. **Ship the finished content changes first** (Phase 0). They don't depend
   on the redesign.
2. **Design the remaining pages in the lab before porting anything**, so you
   approve every page up front.
3. **Do the whole visual change on one branch, merged as one PR.** Production
   flips from the old look to the new one in a single deploy. Commit phase
   by phase inside the branch so it stays reviewable.
4. **Port into the existing component tree** (atoms → templates). Don't
   import from `src/app/lab`. Keep each component's behaviour and tests and
   change its markup and styles. The Header and Footer tests (11 and 8)
   check behaviour, not looks, so they keep guarding the new versions.

## Phase 0 — Ship what's already done

- Push `5f3b4ec`. Go through a PR if you want to respect the repo's "changes
  via PR" rule; direct pushes have bypassed it before. Amplify deploys
  `main`.
- Commit the two uncommitted edits: the taste profile's Round 7 notes and
  the lab index note.
- Decide whether `screenshots/redesign-lab/` (4.7 MB) stays in the repo.

## Phase 1 — Design the pages that aren't designed yet (lab, your review)

Status 2026-10-23: **Contact is built in the lab** at
`/lab/{en,de}/broadsheet/contact`, awaiting your review. 404 and Writing are
next. The "Prefer to talk live?" calendar panel is **dropped** from the
redesign (your call). At launch, remove it from `ContactAside`, and decide
whether `CALENDLY_URL` and the `schedule*` dictionary keys go with it.

1. **Contact**: the biggest open item. Form, topic chips, success panel,
   hidden spam field and side panel. Likely shape: intro on the grid, the
   form on the off-white sheet, then the footer.
2. **404**: an intro on the grid, links home and to Projects, then the
   footer.
3. **Writing index and posts**: a light pass reusing the project pages'
   reading styles, so they're coherent if the flag is ever turned on.
4. **Root `/`**: shows nothing (an invisible language redirect). Check only.

## Phase 2 — Foundation (site-wide)

- **Fonts** (`src/app/layout.tsx`):
  - Swap Merriweather for Fraunces as `--font-serif`, normal style only,
    since nothing uses its italic now.
  - Add IBM Plex Mono as `--font-mono`, and keep Mulish.
  - Compare font download size before and after.
- **Tokens** (`src/styles/globals.scss`):
  - Add marigold, the off-white sheet, the gold divider, `--on-marigold`
    and the sweep timing.
  - Make the dark `.inverse` scope available site-wide.
- **Background:** take the drafting grid off `body`; it becomes the
  background of intro sections only. Update the browser theme colour to
  match the header.
- **Motion:** retire `GridIntro` (the page-wide grid fade). Move the lab's
  `Motion` (scroll reveals, reduced-motion aware) into components.
- **Type:** headings in Fraunces. Re-set `.prose` the way the lab's case
  studies are; that covers project and writing bodies.
- **Check the CMS (`/admin`):** it reads the same tokens and `--font-serif`.

## Phase 3 — Header and footer

- **`Header.tsx`:** keep its logic: active link from the URL, the Writing
  flag, the language switch's path swap, the burger menu, the solid bar on
  scroll. Swap in the Broadsheet look:
  - the original small-caps nav with the marigold stroke
  - the marigold language picker
  - the charcoal bottom edge
- **`Footer.tsx`:** the near-black Broadsheet footer, with the email and
  arrows in darker gold.

## Phase 4 — Home

New or restyled components, then `[locale]/page.tsx` laid out like the lab
home (the data is already identical):

- Hero
- Ticker (replaces Now)
- Numbered SectionHeading (light and dark)
- ProjectCard (default, feature and compact)
- Asterisk
- Button (marigold and white with hard shadows)
- Tag (mono, square)

## Phase 5 — Projects list and project pages

- **`[locale]/portfolio/page.tsx`:**
  - The lab list layout.
  - `PostGrid` gets the Broadsheet grid. The tag filter is still off.
- **`PortfolioPostTemplate`:**
  - The lab project layout: facts strip, overlapping cover, pinned aside,
    case-study type, previous/next and Other projects on dark.
  - `TableOfContents` restyled with the same behaviour.
  - Metadata, structured data and static params stay as they are.

## Phase 6 — Contact, 404, Writing

Build Phase 1's approved designs into the live components:

- `ContactForm`
- `ContactAside`
- `NotFound`
- `WritingPostTemplate`
- `PostList`
- `PostCard`

## Phase 7 — Content and assets

- **The johnedmondson.dev v2 project:** its cover is a screenshot of the
  old home page. Replace it, and update its write-up if it describes the old
  look (your call).
- **Social preview image** (`/preview-image.jpg`, the portrait card): keep
  or refresh.
- **Your intro paragraph** (replacing "Relational data models…"): can ship
  after launch.

## Phase 8 — QA and launch

- **Code:** `npm test`, lint, and `npm run build`.
- **Every page in the export:** serve `out/` locally with Amplify-style
  `.html` rewrites. Check every page in English and German from 375 to
  1920px wide, with no overflow and no console errors.
- **Accessibility:**
  - Contrast, with the known exceptions listed below.
  - Keyboard focus visible on both light and dark.
  - Reduced motion: a still ticker and no reveals.
  - Screen-reader names.
- **Screenshots:** a fresh bilingual set, replacing the 2026-09-01 one in
  `screenshots/`.
- **Launch:** merge, let Amplify deploy, then check production.
- **Rollback:** revert the merge commit and push; Amplify redeploys the
  previous version.

## Phase 9 — Clean up

- Delete `src/app/lab/`, including the Signal option, or keep `/lab` as a
  design sandbox.
- Update the taste profile and memory notes.

## Decisions needed from you

| #   | Decision                                                                                      | Recommendation                                                                                             |
| --- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 1   | Language picker is about 2:1 contrast (fails AA)                                              | Switch it to the darker gold before launch (passes at 5.6–5.8:1)                                           |
| 2   | Ticker keeps moving; the only pause is hover or focus (reduced-motion users get a still band) | Accept for launch; add a pause button later if wanted                                                      |
| 3   | Rename the `/portfolio` URL to `/projects`                                                    | A separate change after launch: it needs redirects, canonical and sitemap updates, and is search-sensitive |
| 4   | "See my work" button wording                                                                  | "See projects", to match the naming                                                                        |
| 5   | Your intro paragraph                                                                          | Don't block launch on it                                                                                   |
| 6   | Contact page direction                                                                        | Decide in Phase 1                                                                                          |
| 7   | Keep or delete the lab after launch                                                           | Delete it; the taste profile records the decisions                                                         |

## Known accessibility exceptions (keep, or fix before launch)

- **Language picker:** about 2:1 (decision 1).
- **Nav:** 12px tracked capitals; you accepted this as an exception to
  "readable small text".
- **Footer email:** darker gold on near-black at 3.2:1. It passes because
  it's set as large text (bold, at least 19px).
- **Dark sections:** all text measures 7.3:1 or better.

## Risks

- **Site-wide CSS changes reach pages we haven't redesigned yet,** such as
  the CMS and the hidden Writing pages. Phases 2 and 6 cover them.
- **Font weight:** Fraunces plus Plex Mono come in, Merriweather goes out.
  Measure the change.
- **CI is the only check before deploy, and it doesn't block one.** Amplify
  deploys `main` even when CI is red, and nothing auto-fixes formatting.
  Run `npm run format:check`, lint, test and build before merging.
- **No preview environment for branches is known.** The check before merge
  is a local run of the static export.

## Rough size

- **Phase 0:** minutes.
- **Phase 1:** one or two sessions, including your review.
- **Phases 2–5:** one session.
- **Phases 6–8:** one session.
