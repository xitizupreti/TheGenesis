import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { band } from "@/lib/band";
import { getAlbum, getAlbums } from "@/lib/gallery";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { Container } from "@/components/ui";
import AlbumGallery from "@/components/AlbumGallery";

type Props = { params: Promise<{ album: string }> };

// Albums are read from public/gallery at build time; unknown slugs 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getAlbums().map((a) => ({ album: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = getAlbum((await params).album);
  if (!album) return {};
  // Some apps (e.g. WhatsApp) don't show WebP previews, so only JPG/PNG
  // covers replace the site-wide share image
  const shareable = /\.(jpe?g|png)$/i.test(album.cover);
  return pageMetadata({
    title: `${album.name} — Gallery`,
    description: `${album.photos.length} ${album.photos.length === 1 ? "photo" : "photos"} of ${band.name}, the women-led band from ${band.location}: ${album.name}.`,
    path: `/gallery/${album.slug}`,
    ...(shareable && {
      image: { url: album.cover, alt: `${album.name} — ${band.name}` },
    }),
  });
}

export default async function AlbumPage({ params }: Props) {
  const album = getAlbum((await params).album);
  if (!album) notFound();

  return (
    <section className="py-12 sm:py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
          { name: album.name, path: `/gallery/${album.slug}` },
        ])}
      />
      <Container>
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1 font-heading text-sm uppercase tracking-[0.18em] text-ash transition hover:text-rose"
        >
          <ChevronLeft className="h-4 w-4" /> All albums
        </Link>
        <div className="mt-6 mb-10">
          <p className="font-heading text-xs uppercase tracking-[0.35em] text-rose">
            Album · {album.photos.length}{" "}
            {album.photos.length === 1 ? "photo" : "photos"}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-6xl">
            {album.name}
          </h1>
        </div>
        <AlbumGallery name={album.name} photos={album.photos} />
      </Container>
    </section>
  );
}
