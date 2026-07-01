import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const routes = ["", "/features", "/contact", "/diagnose"];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
