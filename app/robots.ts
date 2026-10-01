import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roam.toolmint.cc";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/safety",
          "/privacy",
          "/terms",
          "/travel-dating",
          "/dating-while-traveling",
          "/meet-people-before-your-trip",
          "/solo-travel-dating",
        ],
        disallow: [
          "/join",
          "/success",
          "/privacy/request",
          "/admin",
          "/admin/",
          "/api/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
