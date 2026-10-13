"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import type { Video } from "@/lib/videos";

// Shows a thumbnail until clicked, so YouTube's player (and its cookies)
// only load when someone actually wants to watch.
function LiteYouTube({ video, priority }: { video: Video; priority?: boolean }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 h-full w-full"
      aria-label={`Play ${video.title}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-ink/40 transition group-hover:bg-ink/20" />
      <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-wine text-bone shadow-lg shadow-wine/40 transition group-hover:scale-110 group-hover:bg-rose group-hover:text-ink">
        <Play className="ml-1 h-7 w-7" fill="currentColor" />
      </span>
    </button>
  );
}

export default function VideoGrid({
  videos,
  featureFirst = false,
}: {
  videos: Video[];
  featureFirst?: boolean;
}) {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {videos.map((v, i) => (
        <li
          key={v.id}
          className={featureFirst && i === 0 ? "md:col-span-2" : ""}
        >
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-coal">
            <LiteYouTube video={v} priority={i === 0} />
          </div>
          <p className="mt-3 font-heading text-lg uppercase tracking-wide">{v.title}</p>
          {v.date && (
            <p className="text-sm text-ash">
              {new Date(`${v.date}T00:00:00`).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
