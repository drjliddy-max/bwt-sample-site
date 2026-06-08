import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Accessibility commitment for this sample site: the WCAG 2.1 AA target, the build-websites-tools gate that enforces it, and how to report a barrier.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    type: "website",
    url: "/accessibility",
    title: "Accessibility Statement",
  },
};

export default function AccessibilityPage() {
  return (
    <>
      <h1>Accessibility statement</h1>
      <p>
        This site is built to support remediation toward WCAG 2.1 AA. The
        build does not deploy unless every configured route passes the
        axe-core checks defined by the build-websites-tools gate:ada gate.
      </p>

      <h2>Standard</h2>
      <p>
        Target: WCAG 2.1 AA. The build fails on any critical, serious, or
        moderate violation reported by axe-core. Minor and best-practice
        findings are recorded but do not block the deploy.
      </p>

      <h2>How the standard is enforced</h2>
      <p>
        Every route in <code>gate.config.json</code> is loaded in a real
        browser (or jsdom on hosts without Chromium) and scanned by
        axe-core. The same scan runs locally and in CI. Deploys cannot
        bypass it.
      </p>

      <h2>Report a barrier</h2>
      <p>
        Send any access barrier you find on this sample to the
        build-websites-tools issue tracker at{" "}
        <a href="https://github.com/drjliddy-max/build-websites-tools/issues">github.com/drjliddy-max/build-websites-tools/issues</a>.
        Each report is reviewed and feeds back into the gate that should
        have caught it.
      </p>

      <h2>Limits of this statement</h2>
      <p>
        This statement describes only this sample site. It is not a
        claim of full WCAG conformance for any other property. Site
        Clinic-built customer sites receive their own per-site accessibility
        statement with site-specific findings.
      </p>
    </>
  );
}
