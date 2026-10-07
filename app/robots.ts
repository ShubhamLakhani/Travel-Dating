import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/seo/site-url";

export default function robots(): MetadataRoute.Robots {
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
    sitemap: getAbsoluteUrl("/sitemap.xml"),
  };
}
