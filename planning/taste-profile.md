# Taste profile — John Edmondson

A living record of what John likes and rejects, with the reasons, so design
work starts from his taste instead of re-guessing it. Started 2026-10-22 from
his first round of feedback on the Broadsheet home page redesign
(`/lab/en/broadsheet`). Add to it after every review round.

## Direction

**Bold editorial on the existing paper, ink and gold.** Chosen over a dark,
tech-product look (option A, "Signal"). The site should feel like a
confident magazine cover, not a SaaS landing page.

## Principles

1. **Typography is where the fun lives.** Expressive type choices, sized up
   and set with care, carry the personality.
2. **High contrast is good.** Ink on paper, marigold as a solid field, hard
   rules and offset shadows.
3. **The display face is for display sizes only.** Fraunces is not strong
   enough small. Anything at or near body size (wordmark, nav, labels,
   footer text, links) uses a face built for small sizes.
4. **Bold is a spice, not a base.** One heavy moment per view (the name).
   Everything else should step down in weight.
5. **Small text must be easy to read.** No tiny, tracked, all-caps
   labels that strain at a glance. This is a readability bar, not just a
   contrast bar.
6. **Only one thing is poster-sized.** Secondary statements (like the
   footer's availability line) should be confident, not shouting.
7. **One name per thing.** The work is "Projects" everywhere: nav, headings
   and links. No "Portfolio" or "Featured work" alongside it.
8. **Decoration earns its place.** Ornament that repeats content (the role
   text circling the portrait) goes. A motif used sparingly and
   consistently (the asterisk) stays.
9. **The voice is his.** Personal and introductory copy is written by John,
   not drafted for him.

## Keep

- Poster-size Fraunces name; the overall typographic playfulness
- The high-contrast look
- Section numbering in outline numerals (01, 02)
- Fixed header with the 2px ink rule along its edge
- The drafting grid, but only behind the intro
- Some of the motion. Which pieces exactly is still to confirm
  (candidates: name rising out of its mask, gold ticker, card reveals,
  highlighter sweep, hover shadows)

## Change

- **Nav hover and active state:** tried an offset marigold block and six
  other treatments; all reverted to the original highlighter stroke (see
  Round 3).
- **Language picker:** the active language shows in marigold, not black.
- **Role line** ("Product Engineer · Full-Stack"): a face that complements
  Fraunces rather than an italic of it.
- **Sections below the intro and the header:** a flat off-white background
  with no grid. The grid marks the intro as its own space.
- **Footer:** readable small text; a smaller availability line.

## Remove

- Text circling the portrait

## Motifs

- **Asterisk / starburst:** liked as a shape. Use it as a recurring accent
  in a few deliberate places, not as a pattern.

## Round 1 applied (2026-10-22): awaiting John's reaction

Choices made where the feedback left room. Confirm or overturn them:

- **Complementary face: IBM Plex Mono.** Used for the role line, ticker
  labels, dates, tags, the language picker and footer labels. It holds up
  at 13px and gives the serif an engineer's counterpart. Alternatives if it
  doesn't feel right: DM Mono (softer), Space Grotesk (a sans with quirks
  that echo Fraunces).
- **Three faces, one job each:** Fraunces for display, Plex Mono for small
  functional labels, Mulish (the site's existing sans) for reading text,
  nav, buttons and links.
- **Nav offset block plus a 2px ink outline** at the link's own position.
  The marigold block alone read as lopsided padding. The outline makes it
  read as a shadow, like the buttons.
- **Weights:** the name stays 800. Headings dropped to 600, nav to 600,
  buttons to 700, ticker items to 500. Small labels are 500 mono.
- **Smallest text is 13px**, with all-caps only on short mono labels.
- **Asterisk** in two places: the end of the role's rule (turning slowly)
  and between the ticker items. The role-line one was later removed, so it
  now appears only in the ticker.
- **Off-white sheet: `#fcfaf6`**, which is also the header background.

## Round 2 (2026-10-22)

- **Projects line up.** The two cards under the lead project sit level in a
  clean grid. The editorial stagger (second card dropped 6rem) went: he
  prefers alignment over magazine asymmetry when it comes to the work.
- **Nav outline is white**, not ink. It disappears on the off-white bar and
  shows only where it crosses the marigold block, as a knocked-out line.
  Applied to hover too, since hover and active share one look.
- **Language picker:** the current language in white on marigold, the other
  in marigold. This is his explicit choice, but both measure about 2:1,
  under the 4.5:1 AA floor in "Standing constraints". It's flagged to him
  with an alternative that keeps the idea: the site's darker gold
  `#8f5a12` for the unselected text (5.6:1) and as the selected
  background (white on it is 5.8:1).
- **Language picker border is marigold too** (outer edge and the divider),
  so the whole control reads in one colour.
- **Project image shadow:** he likes the solid ink block at rest. On hover
  it turns marigold. Tried with an ink outline (too heavy) and with no
  outline (didn't like it). Now trying an outline in the darker gold
  `#8f5a12`. Takeaway: a block reads better with an edge, but the edge
  should be tonal, not black. He liked it ("awesome").
- **"Currently" ticker** now has darker gold `#8f5a12` top and bottom edges
  instead of ink, the same tonal-edge rule applied to the other big
  marigold field.
- **All structural lines are darker gold:** the header's bottom edge, the
  rules above the numbered sections, the dateline after the role, and the
  rule beside the bio and buttons (a `--divider` token). Ink is now kept
  for the edges of objects: buttons, project images, the portrait and its
  disc, and tags. The outline section numbers (01, 02) are darker gold too,
  so each section's number and its rule read as one gold mark. Rule of thumb: lines that
  divide the page are gold; lines that outline a thing are ink.
- **Section titles: tried all caps (PROJECTS, ABOUT), then went back to
  normal capitalisation** ("Projects", "About") at the original size and
  tight tracking. The phone layout change from that round stays: the "All
  projects" link sits on its own line under the title.
- **The spinning asterisk at the end of the role line was darker gold**, like
  the rule it caps, and was later **removed** (2026-10-23) at his request.
  The role's rule now runs plainly to the margin. The asterisks between ticker items are darker gold too
  (they sit on marigold, so they read as a tone-on-tone mark). Every
  asterisk on the page is now darker gold.

## Round 3 (2026-10-22): nav experiments, all reverted

Tried in order on the menu links, each at his request:

1. The project-title highlighter strip
2. A deeper half-line strip
3. A solid bar in front of the text
4. That bar lowered to the titles' offset
5. A filter bar that turned the covered letters gold
6. The filter colours flipped
7. Gold menu text

His verdict: "I don't like any of this". The nav is back to the **original
Broadsheet concept**: small tracked capitals in ink, with a marigold
highlighter stroke that sweeps under the word on hover (0.3s) and stays
under the current page. The language picker keeps his marigold changes.

Lessons:

- **Iterating on one small element by stacking effects made it worse.** He
  said himself it had become "too complicated… just too busy". When a
  small element isn't working after two or three tweaks, step back and
  show two or three distinct options side by side, rather than adding
  another layer.
- **The simple first version was right.** Treat the first Broadsheet nav
  as the baseline to beat.
- **Tension to revisit:** this nav uses 12px tracked capitals, which
  Principle 5 calls hard to read. He chose it knowingly, so the nav is an
  accepted exception for now. Raise it again only if readability comes up.

## Round 4 (2026-10-23): page weight

- **The numbered sections (01 Projects, 02 About) are reversed out of
  ink:** a dark ground with light text, so the page runs light at the top
  (header, gridded intro) through the marigold ticker to dark at the
  bottom. His aim: better overall weight across the page.
- On the dark ground the gold jobs (dates, outline numbers, dividers) move
  from the darker gold to marigold. `#8f5a12` is only 2.3:1 on ink, and
  marigold is 7.3:1. Text measures 12.9:1 (main) and 8.2:1 (soft). The
  hard shadow behind project images is light at rest, the reverse of the
  ink block.
- Built as one token scope (`.inverse`), so it's easy to tune or undo.
  The About highlighter is now solid darker gold `#8f5a12` (the translucent
  marigold went muddy on dark). Light text over it measures 5.2:1.
- **Footer is near-black `#161514`**, a step darker than the ink sections,
  so the page keeps getting heavier all the way down.

## Round 5 (2026-10-23): intro rules

- **The intro's horizontal rule (after the role) is marigold** instead of
  the darker gold, picking up the ticker below it.
- **The vertical rule beside the bio and buttons is charcoal `#2b2926`**,
  the colour of the dark sections below. ("Background grey" was read as
  that charcoal; the hero's own paper colour would be invisible.)
- **The fixed header's bottom edge is charcoal `#2b2926` too**, matching the
  intro's vertical rule.
- So the "lines that divide are darker gold" rule of thumb from Round 2 now
  holds only for the section rules. The header edge and intro rules have
  moved to charcoal and marigold.

## Round 6 (2026-10-23): footer accents

- **The email and the ↗ arrows on GitHub and LinkedIn are the darker gold**
  `#8f5a12` instead of marigold. On the near-black footer that's 3.2:1, so
  the email was made large text (bold, at least 19px) to keep it within
  WCAG AA (large text needs 3:1). The arrows are decorative. The footer's
  small mono labels (Availability, Elsewhere) stay marigold.

## Round 7 (2026-10-23): projects pages

- **Light to dark is the page structure, not just the home page's.** He
  likes that it makes the site feel "grounded / weighted". Applied to the
  projects list (gridded intro, marigold stripe, cards on dark, footer)
  and project pages (gridded intro, cover overlapping onto an off-white
  reading sheet, previous/next and other projects on dark, footer).
- Long case studies are read on the light sheet, not on dark: comfort for
  long text beats the scheme. The dark ground holds navigation (pager,
  related cards).
- Seams between light and dark are marked: the ticker on home, a 0.5rem
  marigold stripe elsewhere (matching the footer's).

## Round 8 (2026-10-23): contact page (lab, awaiting his review)

- **Light to dark again:**
  - The "Let's talk" poster title and intro are on the grid.
  - The form and Details are on the off-white sheet, which runs straight into
    the footer's marigold stripe.
- **No "Prefer to talk live?" / calendar booking.** In his words: "I'm not so
  busy that I need people schedule time slots with me." Positioning note:
  invite a direct message, not a booking flow. Don't add scheduling prompts
  elsewhere either.
- **Form:** mono labels, square ink-ruled fields, mono topic chips that turn
  marigold with a small hard shadow when chosen. Focus shows as a
  darker-gold block offset behind the field.
- **Sent:** the form becomes a marigold panel with an ink hard shadow, and
  the asterisk is stamped on its corner (a third, deliberate use of the
  motif).
- Behaviour is identical to the live form: validation, the honeypot, the
  3-second floor, the topic carried in the message, the mailto fallback.

## Content structure

- **A project's title is just its name; what it is goes in a subhead.**
  "Six Pillars" over "Cloud Optimization Platform", rather than one string
  joined by a dash. This is site-wide: the content has a `subtitle` field,
  the CMS has a Subhead input, and live cards and project pages show it.
  Single-line places (browser tab, link previews, search data) still join
  the two as "Name — Subhead".

## Motion notes

- **The marigold highlight sweeping under a project title on hover:**
  liked, but asked for it a little slower (0.35s → 0.6s), then for a
  longer ease-out (now 0.9s on an expo ease-out,
  `cubic-bezier(0.16, 1, 0.3, 1)`). He prefers motion that settles
  softly and has time to be seen over quick flicks or abrupt stops.

## Pending from John

- His own intro paragraph to replace "Relational data models, APIs…": who he
  is as a person, how he thinks and works.
- Which animations he likes and how much motion feels right overall.
- Reference sites or work he admires, with one thing he likes about each.

## Standing constraints (from earlier work)

- WCAG AA contrast on all text; reduced-motion users get a still page.
- The header avatar stays the illustrated one. The real photo is only
  for the hero portrait.
- Client names and business metrics stay off the site unless he says so.
