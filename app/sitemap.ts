import type { MetadataRoute } from "next";
import { members, navLinks } from "@/lib/band";
import { getAlbums } from "@/lib/gallery";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const albums = getAlbums();

  const pageImages: Record<string, string[]> = {
    "/": ["/images/cover.webp", "/images/group.webp", "/images/logo.webp"],
    "/about": ["/images/group.webp", ...members.map((m) => m.photo)],
    "/gallery": albums.map((a) => a.cover),
  };

  const pages = navLinks.map((l) => ({
    url: absoluteUrl(l.href),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: l.href === "/" ? 1 : 0.8,
    ...(pageImages[l.href] && { images: pageImages[l.href].map((p) => absoluteUrl(p)) }),
  }));

  const albumPages = albums.map((a) => ({
    url: absoluteUrl(`/gallery/${a.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    images: a.photos.map((p) => absoluteUrl(p)),
  }));

  return [...pages, ...albumPages];
}
