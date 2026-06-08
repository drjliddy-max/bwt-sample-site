import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "What the four build-websites-tools gates check on every build, and the failure modes each one is designed to catch before a deploy leaves the CI pipeline.",
  alternates: { canonical: "/services" },
  openGraph: { type: "website", url: "/services", title: "Services" },
};

export default function ServicesPage() {
  return (
    <>
      <h1>What each gate does</h1>
      <p>
        Four gates run before every build. A failing gate fails the build.
        A failing build does not deploy. Each gate is scoped to a specific
        class of regression so the cause is obvious when it fails.
      </p>

      <h2>gate:seo</h2>
      <p>
        Fetches every configured route and the sitemap. Asserts each route
        returns 200, sets a canonical link, ships title and description in
        the published length window, declares OpenGraph and Twitter card
        meta, renders exactly one h1, walks heading levels in order, and
        agrees with the sitemap.
      </p>

      <h2>gate:ada</h2>
      <p>
        Loads every configured route in a real browser (or jsdom on
        Chromium-less hosts) and runs axe-core. Any critical, serious, or
        moderate WCAG 2.1 AA violation fails the build.
      </p>

      <h2>gate:ai-instrumentation-source</h2>
      <p>
        Static scan of the repository — no server needed. Verifies exactly
        one robots.txt serving mechanism, that mechanism declares an AI
        policy, exactly one llms.txt mechanism with a Markdown heading, and
        the homepage source ships Organization or WebSite JSON-LD.
      </p>

      <h2>gate:ai-instrumentation</h2>
      <p>
        Runtime probe of the same surfaces against the running site.
        Catches the case where the source check passed but a deploy step
        dropped or rewrote one of the files.
      </p>
    </>
  );
}
