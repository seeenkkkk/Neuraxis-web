import type { MetadataRoute } from "next";

const SITE = "https://neuraxis-web.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // La app privada y el backend no deben aparecer en buscadores
        disallow: ["/api/", "/dashboard", "/agents", "/chat", "/clients", "/calendar", "/content", "/workflows", "/billing", "/settings", "/academy", "/wizard", "/delegate", "/excel", "/prompts", "/roadmap", "/web", "/login", "/register"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
