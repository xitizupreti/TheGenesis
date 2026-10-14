import type { Metadata } from "next";
import { Guitar } from "lucide-react";
import { band } from "@/lib/band";
import { shortVideos, youtubeVideos } from "@/lib/videos";
import { pageMetadata } from "@/lib/seo";
import { Container, EmptyState, PageHero } from "@/components/ui";
import VideoGrid, { ShortVideoGrid } from "@/components/VideoGrid";
import FollowStrip from "@/components/FollowStrip";
import { YoutubeIcon } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Music & Videos",
  description: `Watch ${band.name} live: ${band.plays} from the women-led band from ${band.location}.`,
  path: "/music",
});

const styles = ["English covers", "Rock", "Metal"];

export default function MusicPage() {
  return (
    <>
      <PageHero
        eyebrow="Watch & listen"
        title="Music & Videos"
        intro={`${band.plays}, played loud and played our way.`}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-12 flex flex-wrap items-center gap-3">
            <Guitar className="h-5 w-5 text-rose" />
            {styles.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line px-4 py-1.5 font-heading text-xs uppercase tracking-[0.2em] text-ash"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="space-y-16">
            {youtubeVideos.length > 0 && <VideoGrid videos={youtubeVideos} featureFirst />}

            {shortVideos.length > 0 && (
              <div>
                <h2 className="mb-6 font-heading text-2xl uppercase tracking-wide">
                  Reels &amp; TikToks
                </h2>
                <ShortVideoGrid videos={shortVideos} />
              </div>
            )}

            {youtubeVideos.length === 0 && shortVideos.length === 0 && (
              <EmptyState icon={<YoutubeIcon className="h-6 w-6" />} title="Videos coming soon">
                We&apos;re putting our videos together — check our socials below in
                the meantime.
              </EmptyState>
            )}

            <FollowStrip />
          </div>
        </Container>
      </section>
    </>
  );
}
