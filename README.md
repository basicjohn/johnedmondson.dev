# johnedmondson.dev — v2

Bilingual (EN/DE) portfolio + writing site with a built-in file-based CMS.

- **Stack:** Next.js 15 (App Router) · React 19 · TypeScript · SCSS Modules
- **Components:** Atomic design (`atoms → molecules → organisms → templates`)
- **Content:** JSON files in `/content`, edited via the local CMS at `/admin`
- **i18n:** Locale-segmented routes (`/en`, `/de`) with a header toggle and cookie-based redirect

## Getting started

```bash
npm install
npm run dev
```

| URL | What |
| --- | --- |
| http://localhost:3000 | Site (redirects to `/en` or your last-used language) |
| http://localhost:3000/de | German version |
| http://localhost:3000/admin | CMS (local dev only) |

## How the CMS works

Posts are JSON documents in `content/posts/`, one file per post. The `/admin`
UI reads and writes them through API routes that are **disabled in production**
(`NODE_ENV === "production"` returns 403). Publishing is just git:

1. Edit/create posts at `/admin` while running `npm run dev`
2. `git add content && git commit && git push`
3. Amplify (or any host) builds the static site from the committed JSON

You get version history, rollback (`git revert`), and zero production attack
surface for free. Drafts are previewable at their URL in dev, and excluded
from production builds.

### Post model

Two post types share one model, rendered by different templates:

- `portfolio` — image-forward template with a sticky fact sheet (client, role,
  year, stack, live/repo links)
- `writing` — editorial reading column with reading time and related posts

Standard CMS features: draft/published status, publish date, tags (with
listing-page filters), featured flag (drives the home page), slug
auto-generation, cover image (with generated-gradient fallback), EN/DE fields
side by side with live Markdown preview.

## Project structure

```
content/
  site.json              # skills, greetings, quotes, social links
  posts/*.json           # one file per post (EN + DE fields)
src/
  app/
    [locale]/            # public site (en/de)
      portfolio/[slug]   # portfolio detail (PortfolioPostTemplate)
      writing/[slug]     # writing detail (WritingPostTemplate)
      contact/
    admin/               # CMS dashboard + editor (dev only)
    api/admin/posts/     # file-backed CRUD (dev only)
  components/
    atoms/               # Button, Tag, Badge, SocialIcon
    molecules/           # FormField, PostCard, ProjectCard, LanguageToggle, …
    organisms/           # Header, Footer, Hero, PostGrid, PostList, ContactForm, PostEditor
    templates/           # PortfolioPost, WritingPost
  dictionaries/          # en.json / de.json UI strings
  lib/                   # content store, i18n, markdown renderer, utils
  styles/                # design tokens + global styles
```

## Configuration

- **Contact form:** set `NEXT_PUBLIC_CONTACT_ENDPOINT` (e.g. your existing
  Amplify Lambda URL) in `.env.local`. Without it, the form falls back to a
  `mailto:` handoff.
- **Translations:** all UI strings live in `src/dictionaries/`. German seed
  content was drafted by AI — review before publishing.

## Deploying on Amplify

Standard Next.js build (`npm run build`). No special config needed — the
admin API routes self-disable in production. If you prefer a fully static
export, all public pages are pre-rendered via `generateStaticParams`.
