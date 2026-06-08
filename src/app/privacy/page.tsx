import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy practices for this build-websites-tools sample site. The site collects no analytics, sets no cookies, and stores no personally identifiable information.",
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", url: "/privacy", title: "Privacy Policy" },
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy policy</h1>
      <p>
        This is a static sample site used to demonstrate
        build-websites-tools enforcement gates. It does not host an
        application, an inbox, an analytics pipeline, or a payment flow.
      </p>

      <h2>What this site collects</h2>
      <p>
        Nothing. The site sets no cookies, ships no analytics scripts,
        runs no tracking pixels, and writes nothing to any database. If
        you arrived from a search engine or a link, only your hosting
        provider sees the request — the site itself stores none of it.
      </p>

      <h2>Third-party services</h2>
      <p>
        Hosting is provided by Vercel. Vercel may keep request logs for
        operational purposes per its own privacy policy. No other
        third-party tooling is wired in.
      </p>

      <h2>How to ask a question</h2>
      <p>
        See the <a href="/contact">contact page</a>. Privacy questions
        about the parent product belong on{" "}
        <a href="https://siteclinic.io">siteclinic.io</a>.
      </p>
    </>
  );
}
