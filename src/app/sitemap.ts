import type { MetadataRoute } from "next";

const SITE = "https://neuraxis-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
