import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000";

const ROUTES = [
  "/",
  "/about",
  "/services",
  "/pricing",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date("2026-06-07"),
    changeFrequency: "monthly",
    priority: path === "/" ? 1.0 : 0.7,
  }));
}
