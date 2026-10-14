"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import type { Video } from "@/lib/videos";
import { InstagramIcon, TiktokIcon } from "@/components/icons";

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

function VideoMeta({ video }: { video: Video }) {
  return (
    <>
      <p className="mt-3 font-heading text-lg uppercase tracking-wide">{video.title}</p>
      {video.date && (
        <p className="text-sm text-ash">
          {new Date(`${video.date}T00:00:00`).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}
    </>
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
        <li key={v.id} className={featureFirst && i === 0 ? "md:col-span-2" : ""}>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-coal">
            <LiteYouTube video={v} priority={i === 0} />
          </div>
          <VideoMeta video={v} />
        </li>
      ))}
    </ul>
  );
}

// Instagram reels / posts and TikToks: vertical embeds from each platform's
// official player. They load lazily as they scroll into view.
export function ShortVideoGrid({ videos }: { videos: Video[] }) {
  return (
    <ul className="grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v) => {
        const isTiktok = v.platform === "tiktok";
        const src = isTiktok
          ? `https://www.tiktok.com/player/v1/${v.id}?description=0&music_info=0&rel=0`
          : `https://www.instagram.com/p/${v.id}/embed/`; // works for reels too
        const Icon = isTiktok ? TiktokIcon : InstagramIcon;
        return (
          <li key={`${v.platform}-${v.id}`} className="mx-auto w-full max-w-[340px]">
            <div
              className={`relative overflow-hidden rounded-2xl border border-line bg-coal ${
                // Instagram's embed wraps the 9:16 video in a profile header and
                // a likes/"View more" footer, so its frame is taller than TikTok's
                isTiktok ? "aspect-[9/16]" : "aspect-[9/19.5]"
              }`}
            >
              <iframe
                src={src}
                title={v.title}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className={`absolute inset-0 h-full w-full ${isTiktok ? "bg-black" : "bg-white"}`}
              />
            </div>
            <a
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 flex items-start gap-2"
            >
              <Icon className="mt-1 h-4 w-4 shrink-0 text-rose" />
              <span className="font-heading text-lg leading-snug uppercase tracking-wide transition group-hover:text-rose">
                {v.title}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
