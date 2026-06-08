import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About this sample site: a Next.js 16 marketing build that ships only what build-websites-tools requires, as a Site Clinic demonstration.",
  alternates: { canonical: "/about" },
  openGraph: { type: "website", url: "/about", title: "About" },
};

export default function AboutPage() {
  return (
    <>
      <h1>About this sample</h1>
      <p>
        This site exists for one reason: to prove that a brand-new Next.js
        marketing build can pass every shipped build-websites-tools gate by
        following only the published README. No private templates, no
        internal Site Clinic scaffolding, no copied scripts.
      </p>

      <h2>What was used</h2>
      <ul>
        <li>Next.js 16 App Router, written by hand.</li>
        <li>build-websites-tools pinned to <code>v0.3.1</code>, installed as a GitHub tag dependency exactly as the README describes.</li>
        <li>One <code>gate.config.json</code> derived from the marketing-site template.</li>
        <li>A static <code>public/robots.txt</code> with the matrix-required AI policy comment block.</li>
        <li>A static <code>public/llms.txt</code> with a Markdown heading.</li>
        <li>JSON-LD for Organization and WebSite served from the root layout.</li>
      </ul>

      <h2>What it shows</h2>
      <p>
        The four gates run at <code>prebuild</code>. Each one fails loudly when
        its invariant breaks. Each one passes on this build. The same package
        is in use on every site on Site Clinic.
      </p>
    </>
  );
}
