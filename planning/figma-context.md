# Figma context — johnedmondson.dev portfolio

Context document for handing the portfolio Figma file to a design tool/agent. Everything below was
read directly from the file via the Figma MCP on 2026-08-03.

## The file

| | |
|---|---|
| URL | https://www.figma.com/design/UQ9zrbnHYPcRb1m1dyE0rW |
| File key | `UQ9zrbnHYPcRb1m1dyE0rW` |
| File title | "Untitled" (the prototype is named **PortfolioProject** — that's the only place the name appears) |
| Pages | One: `Page 1` (`0:1`) |
| Top-level nodes | 35 |
| Canvas extent | ~17,230 × 16,156 |
| Local copies | `planning/designs/PortfolioSite-2023.fig`, `planning/designs/PortfolioSite-2024.fig` |

Deep-link any frame as `https://www.figma.com/design/UQ9zrbnHYPcRb1m1dyE0rW/Untitled?node-id=<id>`
using the node id with a dash (e.g. `232-2173`).

## How to read this file

**The canvas is organized in horizontal rows, and within each row the frames run left → right in
order of development. The rightmost frame in a row is the most developed that concept got.**

A single page can occupy several rows, because the same page was explored in multiple parallel
directions (Homepage has three: Option A, Option B, Option C). Rows are separate directions, not
sequential revisions of each other — Option B is not "after" Option A, it's *beside* it.

Practical consequence for anyone consuming this file: **read the rightmost frame of each row, and
treat everything to its left as superseded.** Do not average across a row, and do not mine the
left-hand frames for patterns — they are abandoned states.

## Row inventory

Rows are listed top-to-bottom by canvas Y. ✅ marks the canonical (rightmost) frame in each row.

### Row 1 — Style & color exploration (y = -2300)

| Frame | Node ID | Size | |
|---|---|---|---|
| Color Scheme Options | `214:97` | 1600×1212 | |
| Style Test 1 | `215:105` | 1000×1000 | |
| Style Test 2 | `216:344` | 1000×1000 | |
| Style Test 3 | `216:482` | 1000×1000 | |
| Style Test 4 | `216:621` | 1000×1000 | |
| Style Test 5 | `216:760` | 1000×1000 | ✅ |

Four loose `RECTANGLE` nodes sit just below Style Tests 2–5 (`216:343`, `216:620`, `216:759`,
`216:898`) — source images for the pattern studies, not part of the design.

### Row 2 — 2023 site (y = -373)

| Frame | Node ID | Size | |
|---|---|---|---|
| Blank Page Layout | `2:3` | 1600×1329 | |
| Homepage / 2023 | `86:65` | 1600×1329 | ✅ |

This row is the *previous* site generation. Historical reference only — the 2024 rows supersede it.

### Row 3 — Homepage 2024, direction A (y = 1467)

| Frame | Node ID | Size | |
|---|---|---|---|
| Homepage / 2024 / Option A1 | `90:132` | 1600×1681 | |
| Homepage / 2024 / Option A2 | `92:329` | 1600×1681 | |
| Homepage / 2024 / Option A3 | `94:418` | 1600×1681 | |
| Homepage / 2024 / Option A4 | `94:504` | 1600×1681 | |
| Homepage / 2024 / Option A5 | `100:588` | 1600×1903 | ✅ |

### Row 4 — Homepage 2024, direction B (y = 3563)

| Frame | Node ID | Size | |
|---|---|---|---|
| Homepage / 2024 / Option B - 1 | `102:672` | 1600×1903 | |
| Homepage / 2024 / Option B - 2 | `102:757` | 1600×2189 | |
| Homepage / 2024 / Option B - 3 | `103:1011` | 1600×2189 | |
| Homepage / 2024 / Option B - 4 | `105:1096` | 1600×2189 | ✅ |

### Row 5 — Homepage 2024, direction C (y = 6307)

| Frame | Node ID | Size | |
|---|---|---|---|
| Homepage / 2024 / Option C - 1 | `105:1183` | 1600×2139 | |
| Homepage / 2024 / Option C - 2 | `112:1306` | 1600×2139 | |
| Homepage / 2024 / Option C - 3 | `205:6` | 1600×2139 | |
| Homepage / 2024 / Option C - 4 | `219:1005` | 1600×2139 | |
| Homepage / 2024 / Option C - 5 | `220:1524` | 1600×2325 | |
| Homepage / 2024 / Option C - 6 | `231:1657` | 1600×2325 | |
| Homepage / 2024 / Option C - 7 | `231:1759` | 1600×2325 | |
| Homepage / 2024 / Option C - 8 | `231:1911` | 1600×2325 | |
| Homepage / 2024 / Option C - 9 | `232:2173` | 1600×2325 | ✅ |

Longest row in the file (9 frames) and the newest homepage direction — **`232:2173` is the most
developed homepage design in the file.**

A stray `GROUP` named "Site Resources Cell" (`112:1296`, 1200×98) sits below Option C - 1 at
y = 7893 — a detached row/cell component, not a page frame.

### Row 6 — Portfolio / case study page 2024, direction A (y = 9603)

| Frame | Node ID | Size | |
|---|---|---|---|
| Portfolio / 2024 / Option A - 1 | `112:1397` | 1600×4144 | |
| Portfolio / 2024 / Option A - 2 | `116:1846` | 1600×4253 | |
| Portfolio / 2024 / Option A - 3 | `124:2145` | 1600×4253 | |
| Portfolio / 2024 / Option A - 4 | `217:900` | 1600×4253 | ✅ |

The case study template — Ion Channel, "Marketing Automation: Illustrating Big Data Capabilities."
Only one direction was explored for this page.

## The two frames that matter

For design-system work, these are the sources of truth:

- **`232:2173`** — Homepage / 2024 / Option C - 9
- **`217:900`** — Portfolio / 2024 / Option A - 4

Values below are aggregated from those two frames only. Counts in parentheses are occurrences.

### Color

| Hex | Role (inferred) | C - 9 | A - 4 |
|---|---|---|---|
| `#323232` | Primary ink / dark surfaces | 34 | 20 |
| `#FFFFFF` | Page background, reversed text | 9 | 6 |
| `#F2A934` | Accent — the amber used for CTAs, rules, highlights | 8 | 5 |
| `#D9D9D9` | Light gray — dividers, placeholder fills | 1 | 5 |
| `#2C2C2C` | Near-black variant | — | 1 |
| `#151515` | Near-black variant | — | 1 |

`#2C2C2C` and `#151515` appear once each and are almost certainly drift off `#323232` rather than
intentional steps — worth collapsing when the palette is formalized.

### Typography

Two families, split by role:

- **Merriweather** (serif) — display and headings
- **Roboto** (sans) — UI, body, labels

Observed pairs, largest first:

| Frame | Style | Size | Line height |
|---|---|---|---|
| C - 9 | Merriweather Bold | 64px | 115% |
| C - 9 | Merriweather Regular | 59px | auto |
| A - 4 | Merriweather Bold | 48px | 115% |
| C - 9 | Merriweather Regular / Bold | 32px | auto |
| A - 4 | Merriweather Bold | 32px | 126% / 130% |
| A - 4 | Merriweather Regular | 32px | auto |
| A - 4 | Roboto Medium | 28px | 115% |
| C - 9 | Merriweather Regular | 28px | auto |
| C - 9 | Merriweather Bold | 24px | 175% |
| C - 9 | Merriweather Regular | 22px | auto |
| C - 9 | Roboto Light | 21px | 175% |
| C - 9 | Merriweather Regular / Bold | 20px | auto |
| A - 4 | Merriweather Bold | 20px | 130% |
| A - 4 | Roboto Light / Regular | 20px | 126% / 130% |
| both | Roboto Light | 18px | 29px |
| C - 9 | Merriweather Regular | 18px | auto |
| both | Roboto Light | 16px | 29px |
| both | Roboto Medium | 16px | auto |
| C - 9 | Merriweather Regular / Light | 16px | auto |
| C - 9 | Roboto Bold | 12px | auto |

Notes for whoever formalizes this:

- The ramp is **not** on a consistent scale — 59px and 64px are near-duplicates across frames, as
  are 48/32 and 22/20. Consolidation is needed.
- Line heights are mixed units: some `auto`, some percent (115/126/130/175%), some absolute (29px).
  Any real type scale needs to pick one convention.
- `Merriweather Regular / 28px / lh 10%` appears once in C - 9 — a mistake in the file, not a style.

### Shape & spacing

| | C - 9 | A - 4 |
|---|---|---|
| Corner radii | 30px (×5), 5px (×2) | 8px (×2) |
| Auto-layout frames | none | one (42px gap, zero padding) |

**The layouts are almost entirely absolutely positioned — there is essentially no auto-layout in
this file.** That means there is no spacing scale to read out of it; a spacing system has to be
*derived* by measuring the canonical frames, not extracted. Same for the radii: 30 / 8 / 5 are three
unrelated values, so a radius scale is a decision to make, not a fact to record.

### What the file does NOT contain

Verified empty:

- Local paint styles: **none**
- Local text styles: **none**
- Local effect styles: **none**
- Variable collections: **none**

Every value above is a raw, hardcoded property on a node. There is no token layer in Figma yet.

Also absent: **any frame narrower than 1600px.** The entire file is desktop-only — no tablet or
mobile designs exist for any direction.

## Current state in code

The site is Vite + React + TypeScript + SCSS (`src/`). Relevant to tokens:

- `src/_variables.scss` currently holds **only four breakpoints** — `$small: 480px`, `$medium: 768px`,
  `$large: 1024px`, `$extra-large: 1200px`. No color, type, spacing, or radius variables exist.
- `src/_mixins.scss`, `src/App.scss`, `src/index.scss`, and per-component styles under
  `src/Components/` and `src/Patterns/` are where hardcoded values would currently live.

So the design system is greenfield on both sides: no tokens in Figma, no tokens in SCSS.

## Open decisions

These need answers before a system can be built, and none of them can be read out of the file:

1. **Which homepage direction wins** — A5 (`100:588`), B-4 (`105:1096`), or C-9 (`232:2173`)? C-9 is
   newest and most iterated, but the file doesn't record a decision.
2. **Spacing scale** — must be derived by measurement, since auto-layout is unused.
3. **Radius scale** — 30 / 8 / 5 need to collapse into a deliberate set.
4. **Type scale** — the ~20 observed size/weight/line-height pairs need to collapse into a ramp with
   one line-height convention.
5. **Responsive behavior** — nothing below 1600px is designed. The four SCSS breakpoints already in
   code are the only responsive artifact that exists anywhere.
6. **Neutral ramp** — `#323232` / `#2C2C2C` / `#151515` / `#D9D9D9` / `#FFFFFF` is not a ramp yet.

## Reading more from the file

The Figma MCP can read this file directly with file key `UQ9zrbnHYPcRb1m1dyE0rW`:

- `get_metadata` with a `nodeId` for structure (a full-page dump exceeds the response limit — always
  scope to a frame).
- `get_screenshot` with a `nodeId` for visuals.
- `get_variable_defs` requires a live selection in the Figma desktop app.

Enabling **Preferences → Enable Dev Mode MCP Server** in the Figma desktop app adds selection-aware
reads against whatever is open.
