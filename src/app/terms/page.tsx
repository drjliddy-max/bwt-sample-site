import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for this build-websites-tools sample site, including the open-source license covering the gate code and the limited scope of the demonstration.",
  alternates: { canonical: "/terms" },
  openGraph: { type: "website", url: "/terms", title: "Terms of Service" },
};

export default function TermsPage() {
  return (
    <>
      <h1>Terms of service</h1>
      <p>
        This site is a public demonstration of build-websites-tools and is
        provided as-is, without warranty of any kind. Nothing on this site
        constitutes a commitment, a service-level agreement, or
        professional advice.
      </p>

      <h2>License of the underlying code</h2>
      <p>
        The build-websites-tools package this site demonstrates is
        published under the MIT License. The source for the package is at{" "}
        <a href="https://github.com/drjliddy-max/build-websites-tools">github.com/drjliddy-max/build-websites-tools</a>.
        The site itself reuses that package per the license.
      </p>

      <h2>Scope of the demonstration</h2>
      <p>
        Every page here is written to describe itself accurately. Where the
        copy implies a Site Clinic onboarding outcome, the canonical source
        for the paid product remains <a href="https://siteclinic.io">siteclinic.io</a>.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        These terms may be updated as the sample evolves. The most recent
        version is whatever this page renders today. Material changes to
        the demonstration are noted in commit history.
      </p>
    </>
  );
}
