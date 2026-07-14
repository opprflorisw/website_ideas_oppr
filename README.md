# Oppr — website ideas

Every version of the Oppr website and scroll-world in one place. Open the deployed URL and
use the **floating pill at the bottom of any page** to jump between versions; the landing
page (`/`) is a gallery of all of them.

## What's here

| Version | Path | What it is |
|---|---|---|
| **Waste MRF walk** (v2) | `/versions/world-waste-mrf/` | Scroll-scrubbed walk through a square waste separation plant, quadrant to quadrant. Structured as **Capture · Understand · Execute**. 5 scenes + 4 corner connectors. |
| **PVC plant walk** (v1) | `/versions/world-pvc/` | The first scroll-world: one continuous production line, intake → extrusion → end of line → understanding corner → orbit. |
| **Spine / Spine 2 / Home** | `/versions/website-v2/spine/`, `/spine2/`, `/` | The three site layout versions (B / C / A). |
| **Directions** | `/versions/website-v2/directions/{control-room,shift-report,timeline}/` | Three product-framing directions. |
| **Supporting pages** | `/versions/website-v2/{how-it-works,proof,results,for-engineers,about}/` | The rest of the v2 site. |

**Not deployed:** the legacy site (`oppr-website` in the working tree) needs Postgres + Resend,
so it can't be served as static files. Run it locally with `npm run db:up && npm run dev`.

## How it's built

- `versions/` — the built, deployable output of each version. Static HTML/CSS/JS/video only, no build step.
  `website-v2` is a Next.js static export (`output: 'export'`); the two worlds are plain static sites.
- `pill.js` — the floating version switcher, injected into every page of every version.
  **To add a version:** drop its built output in `versions/<name>/`, append an entry to `VERSIONS`
  in `pill.js`, add a card to `index.html`, and inject `<script src="/pill.js" defer></script>`
  before `</body>` of its pages.
- `source/` — how the scroll-worlds are made: `BLUEPRINT.md` (the v2 architecture), `blocks/`
  (locked prompt fragments: style, world rules, thread grammar, camera motion), `stories/<slug>/`
  (`story.json` = the only hand-written file per industry, plus `PROCESS_SPEC.md` and the image/video
  prompts), `engine/scrub-engine.js` (the scroll-scrub engine).

## Run locally

```bash
python -m http.server 3600     # then open http://localhost:3600
```

## Deploy

Static — no build step. Vercel serves this repo root as-is (`vercel.json` sets long cache
headers on the video assets). Pushing to `main` redeploys.
