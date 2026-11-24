import type { MetadataRoute } from "next";

const SITE = "https://neuraxis-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...["/aviso-legal", "/privacidad", "/cookies"].map((p) => ({
      url: SITE + p, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.2,
    })),
  ];
}
