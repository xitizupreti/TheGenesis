import type { Metadata } from "next";
import { Images } from "lucide-react";
import { band } from "@/lib/band";
import { getAlbums } from "@/lib/gallery";
import { pageMetadata } from "@/lib/seo";
import { Container, EmptyState, PageHero } from "@/components/ui";
import AlbumCard from "@/components/AlbumCard";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description: `Photo albums of ${band.name}, the women-led band from ${band.location}: live shows, rehearsals and behind the scenes.`,
  path: "/gallery",
});

export default function GalleryPage() {
  const albums = getAlbums();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Albums"
        intro="Live shows, rehearsals and everything in between."
      />
      <section className="py-16 sm:py-20">
        <Container>
          {albums.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((a) => (
                <AlbumCard key={a.slug} album={a} />
              ))}
            </div>
          ) : (
            <EmptyState icon={<Images className="h-6 w-6" />} title="No albums yet">
              Photos are on their way.
            </EmptyState>
          )}
        </Container>
      </section>
    </>
  );
}
