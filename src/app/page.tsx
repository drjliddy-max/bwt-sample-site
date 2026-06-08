import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "A deliberately minimal Next.js marketing site that proves the four build-websites-tools enforcement gates can pass end to end against a real build.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: "Site Clinic Sample Site" },
};

export default function HomePage() {
  return (
    <>
      <h1>A site that passes every gate</h1>
      <p>
        This is a public sample of a Next.js marketing build wired with{" "}
        <a href="https://github.com/drjliddy-max/build-websites-tools">build-websites-tools</a>{" "}
        — the open-source enforcement layer from{" "}
        <a href="https://siteclinic.io">Site Clinic</a>. Every page on the
        site was authored to pass all four shipped gates without exception.
      </p>

      <h2>What the gates enforce</h2>
      <ul>
        <li><strong>gate:seo</strong> — server-rendered HTML, canonical link, title and description in the published length window, OpenGraph, Twitter card, single h1, heading hierarchy, sitemap and routes agree.</li>
        <li><strong>gate:ada</strong> — WCAG 2.1 AA via axe-core on every configured route.</li>
        <li><strong>gate:ai-instrumentation-source</strong> — robots.txt declares an AI policy, /llms.txt is present with a Markdown heading, and the homepage source ships Organization or WebSite JSON-LD.</li>
        <li><strong>gate:ai-instrumentation</strong> — the live build serves robots.txt, /llms.txt, and JSON-LD at the surfaces the source gate verified.</li>
      </ul>

      <div className="callout">
        <strong>Status:</strong> all four gates pass against the local build. The
        deployment surface is also a demonstration — meaningful only as a
        showcase of what a clean build-websites-tools onboarding produces.
      </div>

      <h2>Why this exists</h2>
      <p>
        The shipped README on build-websites-tools describes a two-file
        consumption surface: a <code>gate.config.json</code> and a set of
        package.json scripts. This sample exercises that promise against a
        from-scratch Next.js 16 build to confirm the published instructions
        work without unstated prerequisites.
      </p>

      <h2>What this is not</h2>
      <p>
        Not a real business. Not a complete site. Not a production
        deployment. This page describes itself accurately — anything outside
        that description is intentional minimalism.
      </p>
    </>
  );
}
