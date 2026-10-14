// Videos on the Music page (and the home page). Paste the full link from
// YouTube, Instagram or TikTok, give it a title, done. Newest first.
//
//   YouTube:   https://www.youtube.com/watch?v=…  ·  https://youtu.be/…  ·  …/shorts/…
//   Instagram: https://www.instagram.com/reel/…   ·  https://www.instagram.com/p/…
//   TikTok:    https://www.tiktok.com/@the_genesis92/video/1234567890123456789
//              (open the video in a browser to get this long link — short
//               vm.tiktok.com links can't be embedded)
//
// YouTube videos show in a 16:9 grid; Instagram reels and TikToks show in a
// separate row of vertical players underneath.

export type VideoEntry = {
  url: string;
  title: string;
  date?: string; // YYYY-MM-DD, optional
};

const entries: VideoEntry[] = [
  {
    url: "https://www.youtube.com/watch?v=-0-gHxygDYg",
    title: "Bachau — Albatross",
  },
  {
    url: "https://www.instagram.com/reel/DZia4_ph0bh/",
    title: "Live Reel",
  },
  {
    url: "https://www.tiktok.com/@the_genesis92/video/7629767874063682824",
    title: "Pari — Kushband (short clip)",
  },
];

export type Platform = "youtube" | "instagram" | "tiktok";

export type Video = VideoEntry & { platform: Platform; id: string };

export function parseVideoUrl(raw: string): { platform: Platform; id: string } | null {
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^(www|m)\./, "");
  const parts = u.pathname.split("/").filter(Boolean);

  if (host === "youtu.be" && parts[0]) return { platform: "youtube", id: parts[0] };
  if (host === "youtube.com" || host === "music.youtube.com") {
    const v = u.searchParams.get("v");
    if (v) return { platform: "youtube", id: v };
    if (["shorts", "live", "embed"].includes(parts[0]) && parts[1])
      return { platform: "youtube", id: parts[1] };
  }
  if (host === "instagram.com" && ["reel", "reels", "p", "tv"].includes(parts[0]) && parts[1])
    return { platform: "instagram", id: parts[1] };
  if (host === "tiktok.com") {
    const i = parts.indexOf("video");
    if (i !== -1 && /^\d+$/.test(parts[i + 1] ?? "")) return { platform: "tiktok", id: parts[i + 1] };
  }
  return null;
}

export const videos: Video[] = entries.flatMap((entry) => {
  const parsed = parseVideoUrl(entry.url);
  if (!parsed) {
    console.warn(`[videos] Skipping "${entry.title}": unsupported link ${entry.url}`);
    return [];
  }
  return [{ ...entry, ...parsed }];
});

export const youtubeVideos = videos.filter((v) => v.platform === "youtube");
export const shortVideos = videos.filter((v) => v.platform !== "youtube");
