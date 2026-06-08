import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "How to reach Site Clinic about onboarding, and how to file an issue against the open-source build-websites-tools repository this sample demonstrates.",
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", url: "/contact", title: "Contact" },
};

export default function ContactPage() {
  return (
    <>
      <h1>Contact</h1>
      <p>
        This sample is a static demonstration and does not run an inbox of
        its own. Direct any question to the right destination below.
      </p>

      <h2>For Site Clinic onboarding</h2>
      <p>
        Use the contact form at{" "}
        <a href="https://siteclinic.io">siteclinic.io</a>. That is the
        canonical inquiry surface for the paid product, including the
        pre-wired onboarding this sample demonstrates.
      </p>

      <h2>For build-websites-tools issues</h2>
      <p>
        File issues against the open-source repository at{" "}
        <a href="https://github.com/drjliddy-max/build-websites-tools/issues">github.com/drjliddy-max/build-websites-tools/issues</a>.
        Bug reports, gate-rule clarifications, and pull requests are
        welcome.
      </p>

      <h2>For accessibility feedback on this sample</h2>
      <p>
        See the{" "}
        <a href="/accessibility">accessibility statement</a> for the
        contact path. Accessibility findings on this sample feed back into
        the gate that flagged them.
      </p>
    </>
  );
}
