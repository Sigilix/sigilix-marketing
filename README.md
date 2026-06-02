# sigilix-marketing

Marketing site for **Sigilix** — multi-agent AI code review for GitHub.

> *The mark of merge-ready code.*

**Domain:** [sigilix.ai](https://sigilix.ai)

**Product repo:** [Arc-and-Anchor/sigilix](https://github.com/Arc-and-Anchor/sigilix)

## Stack (TBD)

This repo is intentionally a thin starter. Pick a stack when you bind to Vercel:

- **Next.js + Tailwind + shadcn/ui** — recommended; matches our other modern repos
- **Astro** — lighter, faster build, ideal for marketing-only
- **Plain HTML + Vercel static** — minimal; fine if the site stays small

Run `npx create-next-app@latest .` (or your stack of choice) inside this dir to scaffold over the README.

## Sub-domains planned

| Subdomain | Purpose |
|---|---|
| `sigilix.ai` | Marketing landing page (this repo) |
| `app.sigilix.ai` | Per-repo dashboard (separate product surface, future) |
| `docs.sigilix.ai` | Customer-facing docs (Mintlify or similar, future) |
| `worker.sigilix.ai` | Optional brand-stable webhook URL → Cloudflare Worker (currently `sigilix.dan-martinezjulio.workers.dev`) |

## Branding

- Tagline: *"The mark of merge-ready code."*
- Differentiator: **multi-agent ensemble** — 4 parallel specialists (logic / security / performance / tests) + a synthesizer per PR review. No standalone competitor (CodeRabbit, Cursor Bugbot, Greptile) runs this architecture.
- Colors / typography / logo: pending design pass
- Email footer image: `https://sigilix.ai/sigilix-email-footer.jpg` (420×180)
- Link preview image: `https://sigilix.ai/sigilix-link-preview.jpg`

## Vercel deploy

After scaffolding:

1. https://vercel.com/new → Import Git Repository → `Arc-and-Anchor/sigilix-marketing`
2. Vercel auto-detects framework → Deploy
3. In project Settings → Domains → add `sigilix.ai` (already owned via Vercel) and `www.sigilix.ai` as redirect to apex

## License

All Rights Reserved · Arc-and-Anchor 2026
