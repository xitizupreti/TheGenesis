import Image from "next/image";
import Link from "next/link";
import type { Album } from "@/lib/gallery";

export default function AlbumCard({ album }: { album: Album }) {
  const count = album.photos.length;
  return (
    <Link
      href={`/gallery/${album.slug}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-coal transition hover:border-wine"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={album.cover}
          alt={`${album.name} album cover`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-transparent to-transparent" />
        <span className="absolute top-3 right-3 rounded-full bg-ink/70 px-3 py-1 text-xs text-bone backdrop-blur">
          {count} {count === 1 ? "photo" : "photos"}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <h3 className="truncate font-heading text-lg uppercase tracking-wide">
          {album.name}
        </h3>
        <span className="text-rose transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
