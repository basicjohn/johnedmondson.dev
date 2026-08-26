# Blog Plan — Writing Drafts (created 2026-07-24)

13 essay ideas, seeded as **`writing` drafts** in the CMS (`content/posts/`, `status: "draft"`).
Each draft has a working title, an excerpt, EN/DE title + excerpt, and a body **scaffold**
(thesis + section prompts + "Notes to self") — not a finished essay. They're starting
points to write *in your voice*.

- **Where they live:** `content/posts/*.json` in this repo (`johnedmondson.dev-v2`).
- **How to see/edit them:** run `npm run dev`, open <http://localhost:3000/admin>.
- **Drafts are private:** excluded from production builds; previewable locally at their URL.
- **Publishing = git:** flip `status` to `published` in `/admin`, then commit + push.

> ⚠️ This repo is **not yet a git repo** (no `.git`). Until it is, the "publish via git"
> step won't work. See *Open items* at the bottom.

---

## The drafts

Suggested cadence: one per week (the dates below are just a starting calendar — change
them freely in `/admin`; the date only sets the displayed publish date).

| # | Working title | Slug | Tags | Target date |
|---|---------------|------|------|-------------|
| 1 | Building for Problems That Won't Sit Still | `building-for-problems-that-wont-sit-still` | AI · Systems Thinking · Craft | 2026-07-28 |
| 2 | Default Mode: Systems Thinker | `default-mode-systems-thinker` | Systems Thinking · Metacognition | 2026-08-04 |
| 3 | Take Your Own Thoughts Seriously | `take-your-own-thoughts-seriously` | Critical Thinking · Metacognition · Writing | 2026-08-11 |
| 4 | Your Mind Is the Worst Place to Store a Thought | `your-mind-is-the-worst-place-to-store-a-thought` | Note-Taking · Productivity · Metacognition | 2026-08-18 |
| 5 | You Don't Know How You Feel Until You Write It Down | `you-dont-know-how-you-feel-until-you-write-it-down` | Writing · Metacognition | 2026-08-25 |
| 6 | Odenkirk's Heresy: Sketch Comedy as the Purest Art | `sketch-comedy-and-the-human-experience` | Creativity · Craft · Culture | 2026-09-01 |
| 7 | When Everything Is Presented Equally | `when-everything-is-presented-equally` | Attention · Critical Thinking · Systems Thinking | 2026-09-08 |
| 8 | A Mind for Concepts, Not Facts | `a-mind-for-concepts-not-facts` | Metacognition · Systems Thinking · Learning | 2026-09-15 |
| 9 | The Drive of More | `the-drive-of-more` | Philosophy · Metacognition · Productivity | 2026-09-22 |
| 10 | Overloading the System to Produce with Precision | `overloading-the-system-to-produce-with-precision` | Productivity · Craft · Metacognition | 2026-09-29 |
| 11 | Learning Loops: The Life of a Serial Hobbyist | `learning-loops-serial-hobbyist` | Learning · Craft · Metacognition | 2026-10-06 |
| 12 | The Fading Need for Expertise | `the-fading-need-for-expertise` | AI · Critical Thinking · Career | 2026-10-13 |
| 13 | Honesty in Reality and the Poison of Toxic Positivity | `honesty-and-the-poison-of-toxic-positivity` | Honesty · Philosophy · Culture | 2026-10-20 |

### One-line angle per post (from your original notes)

1. **Building for Problems That Won't Sit Still** — If AI makes every problem bespoke and cheap to solve once, what is "building to solve problems" even worth? Value moves from the artifact to the system that produces artifacts.
2. **Default Mode: Systems Thinker** — Your first instinct is the *connection*, not the thing — connections others treat as insignificant or don't see. The real skill is filtering + translating them.
3. **Take Your Own Thoughts Seriously** — Aim critical thinking *inward* at your half-formed ideas before dismissing them. "Take seriously" ≠ "believe."
4. **Your Mind Is the Worst Place to Store a Thought** — The mind has ideas brilliantly and holds them terribly. Notes are defense against your own memory.
5. **You Don't Know How You Feel Until You Write It Down** — Writing isn't transcription; it's discovery. The thought gets *finished by* the typing.
6. **Odenkirk's Heresy** — Bob Odenkirk's claim that sculpting into "art" drifts from real life, and sketch comedy (disposable, unpolished) is the purest human mirror. *(To-do: find + cite the exact quote/source.)*
7. **When Everything Is Presented Equally** — Feeds/inboxes/dashboards flatten everything to equal weight; deciding what matters is now a skill, not a given.
8. **A Mind for Concepts, Not Facts** — You lose specifics but keep the shape of how things relate. Not "bad memory" — *conceptual* memory. The engine of systems thinking.
9. **The Drive of More** — The engine that makes you build is the one that never lets you feel finished. Living *with* it without being run by it. (Keep it honest / unresolved.)
10. **Overloading the System to Produce with Precision** — Deliberately pile on more input than is comfortable, then compress/cut. Overload → precision *only if* paired with ruthless editing.
11. **Learning Loops: The Life of a Serial Hobbyist** — Ignition → immersion → plateau → exit. The transferable skill isn't any hobby; it's learning itself.
12. **The Fading Need for Expertise** — As tools absorb specialized knowledge, memorized expertise depreciates and fundamental critical thinking (judgment, framing, taste) appreciates.
13. **Honesty in Reality and the Poison of Toxic Positivity** — Forced positivity is a refusal to look at what's real. Honest acknowledgment > forced optimism — and where the line is (not cruelty, not doom).

---

## Thematic clusters (potential series)

These overlap on purpose — you could run them as mini-series or interlink them:

- **Metacognition / how my mind works:** #2, #8, #9 → could be a "How I Think" series.
- **Thinking on paper:** #3, #4, #5 → a "Writing to Think" series (strong internal links already noted in the drafts).
- **Attention & judgment in the AI era:** #1, #7, #12 → a "Thinking When Answers Are Cheap" series.
- **Craft & honesty:** #6, #10, #11, #13 → standalone, but share a "resist the polished lie" thread.

---

## Cross-posting workflow (website → LinkedIn → dev.to)

Publish on your own site **first** (canonical), then syndicate:

1. **Website (canonical):** finish the draft in `/admin`, set `status: published`, commit + push.
2. **LinkedIn:** post the full essay as a LinkedIn *article* (or a short hook + link). Personal/reflective pieces (#2, #5, #9, #11, #13) tend to do best here.
3. **dev.to:** best fit for the tech-leaning ones (#1, #7, #12). Use dev.to's **`canonical_url`** front-matter pointing back to your site so you don't get dinged for duplicate content.
4. Keep a status column somewhere (here, or a tag) as you move each piece: `draft → published → syndicated`.

---

## Open items

- [ ] **`git init` this repo** (`johnedmondson.dev-v2`) so the "publish = commit" flow actually works, and you get version history / rollback.
- [ ] **#6 Odenkirk:** locate + cite the exact quote/source before publishing; keep any direct quote short and attributed.
- [ ] Decide whether to translate bodies into German (DE titles + excerpts are seeded; DE bodies are empty). The site is bilingual EN/DE.
- [ ] Optionally add cover images (`cover` field); otherwise cards use a generated gradient.
