import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "build-websites-tools is free under MIT. Site Clinic is the paid surface that wires the gates in, monitors the live site, and ships an audit-grade report.",
  alternates: { canonical: "/pricing" },
  openGraph: { type: "website", url: "/pricing", title: "Pricing" },
};

export default function PricingPage() {
  return (
    <>
      <h1>Pricing</h1>
      <p>
        The enforcement layer this site demonstrates is open source. The
        ongoing monitoring, the pre-wired onboarding, and the audit-grade
        report are the paid Site Clinic surfaces.
      </p>

      <h2>build-websites-tools</h2>
      <p>
        Free under the MIT License. Install as a GitHub tag dependency, ship
        a gate.config.json, run <code>gate:all</code> at prebuild. No
        subscription, no telemetry, no upgrade pressure. The same package is
        in use on every Site Clinic-built site.
      </p>

      <h2>Site Clinic</h2>
      <p>
        Site Clinic is the parent product. It pre-wires the gates, runs
        ongoing monitoring against the live site, alerts on production
        drift, and ships audit-grade reports an attorney or client can read.
        Pricing for the paid surface lives at{" "}
        <a href="https://siteclinic.io">siteclinic.io</a>.
      </p>

      <div className="callout">
        <strong>Note:</strong> this sample site is not a Site Clinic
        subscription. It is a public demonstration of the open-source
        gates running against a fresh build.
      </div>
    </>
  );
}
