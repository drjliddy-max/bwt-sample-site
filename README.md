# Site Clinic Sample Site

[![Gates](https://github.com/drjliddy-max/bwt-sample-site/actions/workflows/gates.yml/badge.svg)](https://github.com/drjliddy-max/bwt-sample-site/actions/workflows/gates.yml)

A public sample of a Next.js 16 marketing build that passes every shipped [`build-websites-tools`](https://github.com/drjliddy-max/build-websites-tools) gate end to end. Built as a Site Clinic showcase and audit of the open-source enforcement layer.

## What this is

- A from-scratch Next.js 16 App Router build. No private templates, no internal Site Clinic scaffolding, no copied scripts.
- Wired with `build-websites-tools@v0.3.3` exactly per the published README.
- 8 routes — `/`, `/about`, `/services`, `/pricing`, `/contact`, `/privacy`, `/terms`, `/accessibility` — each authored to pass all four gates.

## How to verify

```bash
npm install
npm run gate:all
```

Expected: 4/4 green. ~60 seconds on an M-series Mac with Playwright Chromium cached.

## Files

| Path | Purpose |
|---|---|
| `src/app/layout.tsx` | Root layout — Organization + WebSite JSON-LD, OpenGraph defaults, lang. |
| `src/app/<route>/page.tsx` | One per route. Per-page title/description/canonical/openGraph. |
| `src/app/sitemap.ts` | Next.js MetadataRoute sitemap listing all 8 routes. |
| `public/robots.txt` | Static — declared AI policy comment block + sitemap directive. |
| `public/llms.txt` | Static — Markdown shape for the matrix §17.3.1.2 surface. |
| `gate.config.json` | The single config file the gates load. |
| `GAP_REPORT.md` | Audit findings: what the README promised vs what actually happened, with five recommended patches. |

## The four gates

| Gate | What it checks |
|---|---|
| `gate:ai-instrumentation-source` | Static scan — exactly one robots.txt mechanism with AI policy comment block, exactly one llms.txt with a Markdown heading, homepage source ships Organization or WebSite JSON-LD. |
| `gate:seo` | Per-route fetch — 200, https canonical, title/description in window, OpenGraph, Twitter card, single h1, heading order, ≥300 chars body text, sitemap-routes consistency. |
| `gate:ada` | Real-browser axe-core (jsdom fallback). WCAG 2.1 AA, no critical/serious/moderate. |
| `gate:ai-instrumentation` | Runtime probe — robots.txt + llms.txt + JSON-LD live on the running site. GA4 explicitly opted out for this no-analytics sample. |

## Related

- [`build-websites-tools`](https://github.com/drjliddy-max/build-websites-tools) — the open-source enforcement layer this site exercises.
- [Site Clinic](https://siteclinic.io) — the parent product. The gates are free; the pre-wired onboarding, monitoring, and audit-grade reporting are the paid surface.
