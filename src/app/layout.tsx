import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bwt-sample-site.vercel.app";
const BRAND = "Site Clinic Sample Site";
const TAGLINE = "Demo build with all four gates passing";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND} — ${TAGLINE}`,
    template: `%s — ${BRAND}`,
  },
  description:
    "A deliberately minimal Next.js marketing site that demonstrates an end-to-end pass of the four build-websites-tools gates: SEO, WCAG 2.1 AA, AI instrumentation source, and AI instrumentation runtime.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${BRAND} — ${TAGLINE}`,
    description:
      "Sample Next.js marketing build wired with build-websites-tools enforcement gates.",
    siteName: BRAND,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND} — ${TAGLINE}`,
    description:
      "Sample Next.js marketing build wired with build-websites-tools enforcement gates.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND,
  url: SITE_URL,
  description:
    "Site Clinic Sample Site — a public demonstration of build-websites-tools enforcement gates.",
  sameAs: [
    "https://github.com/drjliddy-max/build-websites-tools",
    "https://siteclinic.io",
  ],
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND,
  url: SITE_URL,
};

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

const FOOTER_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        <header className="site-header">
          <nav aria-label="Primary">
            <a className="brand" href="/">{BRAND}</a>
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="inner">
            <span>© {new Date().getFullYear()} {BRAND}.</span>
            {FOOTER_LINKS.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </div>
        </footer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
      </body>
    </html>
  );
}
