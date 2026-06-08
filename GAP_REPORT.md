# build-websites-tools v0.3.1: End-to-End Evaluation

**Audit date:** 2026-06-07
**Auditor:** scaffolded by Claude in `/Users/johnliddy/Desktop/Projects/bwt-sample-site`
**Source under test:** [`drjliddy-max/build-websites-tools` v0.3.1](https://github.com/drjliddy-max/build-websites-tools)

## TL;DR

The README's headline claim, *"Two files. That's the whole consumption surface"*, is **substantially true but understated**. A literal-by-the-README install on a fresh Next.js 16 app reaches a passing build, but only after four undocumented adjustments that the README does not call out and a fifth that is documented only in the source. None are deal-breakers. All are fixable with one line of CHANGELOG and one paragraph of README copy. The package does what it says.

**Verdict:** Ship-ready for the audience the README is written for (devs who can read TypeScript). Not ship-ready for the audience the README implies it serves (anyone who wants enforcement without reading the gates). See "Recommended README/CHANGELOG patches" at the bottom.

---

## Evidence: the four gates against this sample

```
gate:ai-instrumentation-source  PASS: 3/3 source invariant(s) verified
gate:seo                        PASS: 8 routes × 20 checks
gate:ada                        PASS: 0 blocking, 0 minor across 8 pages (browser mode)
gate:ai-instrumentation         PASS: 3/3 dimension(s) verified
gate:all                        EXIT 0
```

Logs captured in this repo's history at `git log` and in `/tmp/bwt-{seo,ada,ai}.log` at the time of audit.

---

## What the README promised

1. **Two files.** `package.json` scripts + `gate.config.json` from a shipped template.
2. **No gate logic in your repo. No copy-pasted scripts. No drift surface.**
3. **Pin to a tag** (`github:drjliddy-max/build-websites-tools#v0.3.1`) for reproducible builds.
4. **Templates** for marketing-site, blog, app-with-protected-routes.
5. **The gates run on every Site Clinic-built site.**
6. **What it does NOT do**: scaffolding a new site, runtime monitoring, multi-site aggregation, audit-grade reports, pre-wired onboarding.

---

## What actually happened

### Step 1. gate:ai-instrumentation-source (PASS first try)

Static scan. Passed immediately once the three required surfaces existed:

- `public/robots.txt` with a `# AI policy` comment block (the regex it scans for).
- `public/llms.txt` with any Markdown heading.
- Homepage source containing `Organization` or `WebSite` JSON-LD, found via the layout.tsx scan.

**Documentation quality:** good. The source comments explain the matrix doctrine and the failure modes that motivated each invariant.

### Step 2. gate:seo (FAIL → FAIL → PASS over three iterations)

#### Iteration A. 19 failures

Three classes:

1. **`canonical link` failed on every route** because the gate requires `canonical.startsWith("https://")` (gate-seo.ts:220) but the shipped marketing-site template defaults `baseUrl: "http://127.0.0.1:3000"`. The metadataBase Next.js builds the canonical from inherited the http dev URL. **Gap: the README and the template do not warn that you must set an https metadataBase even in dev.**
2. **`og:type` missing on every route** because Next.js metadata merging replaces `openGraph` wholesale when a child page overrides it; the layout's `openGraph.type: "website"` is dropped on every page that sets its own `openGraph`. **Gap: framework-specific behavior the README cannot fix, but a "common Next.js pitfalls" note would prevent it.**
3. **Three descriptions over the 160-char ceiling.** This is a content authoring issue, not a tooling issue. The error message was clear; no documentation gap.

#### Iteration B. 8 failures

Only `canonical link` remained. I had set `SITE_URL` fallback to `https://...` in `layout.tsx` but the auto-generated `next.config.mjs` had `env: { NEXT_PUBLIC_SITE_URL: "http://127.0.0.1:3000" }`, which Next.js bakes into the runtime, overriding the layout fallback. Removed the `env` block and the canonical resolved to the https metadataBase.

#### Iteration C. PASS

8 routes, 20 checks each, all green.

**Documentation quality:** good error messages with actual vs expected. The gap is not the error messages; it's the absence of any onboarding text that calls out the https-canonical requirement.

### Step 3. gate:ada (PASS first try)

Real-browser mode (Playwright Chromium was cached system-wide). Zero blocking, zero minor across 8 routes. The fallback path to jsdom on Chromium-less hosts is explicit and well-commented in the source.

**Documentation quality:** good.

### Step 4. gate:ai-instrumentation (FAIL → PASS)

#### Iteration A. 1 failure

`ga4: no GA4 measurement ID found`. The gate requires either a `gtag('config', 'G-…')` call or a `gtag/js?id=G-…` loader script in the homepage HTML.

The shipped template includes `aiInstrumentation.ga4.consentGated.measurementId: "G-CHANGE-ME"`, implying you must declare a real GA4 ID even on a no-analytics site. There IS an opt-out (`aiInstrumentation.checks.ga4: false`) but it lives only in the source code. **Gap: the README's "Config schema" section says `aiInstrumentation` is optional but does not document the `checks.ga4: false` opt-out for sites that deliberately ship no analytics.**

A second related gap: **`load-config.ts` strips the entire `aiInstrumentation` block from the GateConfig interface and never returns it.** The runtime AI gate works around this by re-reading `gate.config.json` itself via `loadMinimalConfig()`. This works but is brittle: the two loaders can drift. A consumer who reads only `load-config.ts` to understand the schema would conclude `aiInstrumentation` is unused.

#### Iteration B. PASS

Added `"aiInstrumentation": { "checks": { "ga4": false } }` to `gate.config.json`. 3/3 dimensions verified.

---

## Gap inventory (5 documented findings)

| # | Severity | Where | Description | Fix |
|---|---|---|---|---|
| 1 | Medium | README + marketing-site template | `baseUrl: "http://127.0.0.1:3000"` cannot pass the gate's own `canonical link` check (requires `https://`). | Add a one-line note in README "Wire it into your site" telling consumers to set `metadataBase` (or equivalent) to an https URL even in dev, OR rewrite the canonical-link check to accept http on local hosts. |
| 2 | Low | README | No mention of the Next.js `openGraph` wholesale-replacement behavior. Common enough that every consumer hits it. | One paragraph in README "Common pitfalls". "If using Next.js metadata exports, each page that sets `openGraph` must include `type: 'website'` (or whatever applies) explicitly; child metadata replaces parent openGraph, it does not merge." |
| 3 | Medium | README "Config schema" | `aiInstrumentation.checks.ga4: false` opt-out path is not documented for sites that ship no analytics by design. | Add a row to the Config schema table: `aiInstrumentation.checks` (per-dimension opt-outs for `ga4`, `llmsTxt`, `robotsAiPolicy`, `jsonLd`); set to `false` to skip with a `_note` describing why. |
| 4 | Low | Source: `load-config.ts` vs `gate-ai-instrumentation.ts` | Two config loaders coexist; `load-config.ts` strips `aiInstrumentation`, the AI gate re-reads the JSON itself. | Unify on one loader, or add a comment in `load-config.ts` explaining the AI block is intentionally scoped to the AI gate. |
| 5 | Low | Runtime AI gate process model | The gate spawns the launchCommand with `stdio: "inherit"` and `SIGTERM`s on exit, but the child Next dev sometimes survives if its own subprocess holds the pipe open. In a pipeline (e.g. `npm run gate:seo \| tee log`), this can hang the consumer's outer pipe. | Use `detached: true` and `process.kill(-child.pid, "SIGTERM")` to kill the whole group, OR document the failure mode and recommend running `gate:*` without an outer pipe. |

**Not gaps** (worth noting in case a future audit re-flags them):

- The required-pages enforcement (`/`, `/privacy`, `/terms`, `/accessibility`, `/contact`) is well documented in the loader source and the error message tells you exactly what to add. The opinion is defensible.
- The MetadataRoute.Robots rejection is well documented and tied to a real incident (liddy-podiatry-site 2026-06-04). The opinion is defensible.
- The GA4 measurement-ID strictness is appropriate for the Site Clinic doctrine: declaring "consent-gated" is meaningfully different from "no analytics," and the gate models both. The README just needs to show consumers the second path.

---

## What the package does NOT do: confirmed accurate

The README's "What this package does NOT do" section is accurate:

- It does not scaffold a new site. I had to write all 8 pages, layout, sitemap, robots, llms, JSON-LD, and CSS by hand. ✓
- It does not monitor a deployed site. Each gate runs once per build invocation and exits. ✓
- It does not aggregate across sites. Output is per-build, stdout/stderr only. ✓

---

## Finding #6: JSDOM-mode color-contrast coverage gap (confirmed by source; visibility could be louder)

**Status:** not a defect; existing warning could be more persistent.

**Concrete reproduction case** (real incident discovered after the original audit):

On 2026-06-08 siteclinic-web commit `7bb07a6` ("feat(footer): Built with build-websites-tools attribution row") landed and deployed green on Vercel. Vercel's builder runs `gate:ada` in JSDOM html-snapshot mode because the Vercel image ships without Playwright Chromium. The build passed.

A subsequent local run on a Mac with Playwright Chromium cached caught a serious color-contrast violation on every route of siteclinic-web. Root cause: the new footer attribution row stacked `opacity-75` on `--color-ink-soft` text at `text-xs` size, dropping below the WCAG 2.1 AA 4.5:1 ratio for normal text. The violation surfaced under browser-mode axe-core; the same scan in JSDOM mode reported clean because axe-core's `color-contrast` rule requires a rendering engine.

**Source confirms this is intentional:**

`src/gate-ada.ts` JSDOM analyzer explicitly disables the rule:

```ts
return await axeRunner.run(dom.window.document, {
  runOnly: { type: "tag", values: [...AXE_TAGS] },
  rules: {
    "color-contrast": { enabled: false },
  },
});
```

The same file already prints a warning when the snapshot fallback activates:

```
gate:ada  html-snapshot fallback disables axe color-contrast because JSDOM
          does not provide canvas-backed visual layout APIs.
```

So the coverage gap is **disclosed**, just not loud enough to survive the noisy build log of a Vercel run. The siteclinic-web pipeline emits hundreds of lines per build; the single early warning is easy to miss.

**Recommended improvement** (proposed in a follow-up PR):

Re-state the mode on the terminal `gate:ada PASS` line, where most operators look first:

```
gate:ada  PASS  [html-snapshot mode; color-contrast not evaluated, rerun in browser mode for full WCAG 2.1 AA coverage]
```

Pure-additive output. No exit-code change. No behavior change for browser-mode runs.

**Operator lesson independent of any package change:** any portfolio site whose only enforced gate:ada run is on Vercel should also run gate:ada in browser mode at least at PR review time. Vercel deploys verify "no JSDOM-detectable violations"; they do not verify "no WCAG 2.1 AA visual contrast violations."

---

## Recommended README/CHANGELOG patches

If I were the maintainer, here are the smallest edits that would close every gap above without changing behavior:

### README patch: add "Common pitfalls" section after "Wire it into your site"

> ### Common pitfalls
>
> **`canonical link` fails locally with `http://...`.** The gate enforces `https://` on every canonical href. Set `metadataBase` (Next.js) or the equivalent in your framework to your eventual deploy URL even in dev. The gate does not follow the URL; it checks the rendered string.
>
> **`og:type` missing on child pages (Next.js).** Next.js metadata merging replaces the parent's `openGraph` object when a child sets its own. Either set `openGraph.type: "website"` explicitly on each page, or set the entire `openGraph` block in the root layout only.
>
> **No analytics? Opt out of the GA4 check.** Add `"aiInstrumentation": { "checks": { "ga4": false } }` to `gate.config.json` for sites that deliberately ship no analytics. The opt-out is recorded in the gate output as a declared exception.

### README patch: extend Config schema table

```
| `aiInstrumentation.checks` | no | `object` | Per-dimension opt-outs. Keys: `ga4`, `llmsTxt`, `robotsAiPolicy`, `jsonLd`. Set to `false` to skip the named check with a logged declared exception. |
| `aiInstrumentation.skip`  | no | `{ reason: string }` | Whole-gate opt-out with a documented reason. Surfaces in the §19 scorecard as an accepted exception. |
```

### CHANGELOG entry: v0.3.2 candidate

```
- DOCS: README "Common pitfalls" section covers the https-canonical, Next.js openGraph merge, and GA4 opt-out paths that every fresh consumer hit during the first integration.
- DOCS: Config schema table now lists `aiInstrumentation.checks` and `aiInstrumentation.skip`.
```

---

## Site Clinic showcase suitability

The sample site that backs this report is deliberately authored to describe itself accurately. Every page is on-topic for a Site Clinic onboarding-outcome demo: it says what it is, what the gates do, what each page is for, and what the limits of the demonstration are. There is no fake business, no inflated claim, no hidden CTA.

It is appropriate to deploy as a clearly-labeled `Site Clinic Sample Site` on a Vercel preview (e.g. `https://bwt-sample-site.vercel.app`) and link it from the build-websites-tools README ("See a passing sample") or from siteclinic.io.

The audit work itself, this report plus the commit history of the site, is the second showcase deliverable. It shows a Site Clinic engagement reading what a tool ships, identifying the gaps, fixing them inside the doctrine, and writing a report a prospect or attorney can read.

---

## How to reproduce

```bash
git clone https://github.com/drjliddy-max/<this-repo>.git
cd <this-repo>
npm install
npm run gate:all
```

Expected output: 4/4 green. Total runtime: ~60s on an M-series Mac with Playwright Chromium cached.
