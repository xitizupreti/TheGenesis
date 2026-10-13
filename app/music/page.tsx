import type { Metadata } from "next";
import { Guitar } from "lucide-react";
import { band, socials } from "@/lib/band";
import { videos } from "@/lib/videos";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, Container, EmptyState, PageHero } from "@/components/ui";
import VideoGrid from "@/components/VideoGrid";
import { InstagramIcon, TiktokIcon, YoutubeIcon } from "@/components/icons";

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

          {videos.length > 0 ? (
            <VideoGrid videos={videos} featureFirst />
          ) : (
            <EmptyState icon={<YoutubeIcon className="h-6 w-6" />} title="Videos coming soon">
              <p>
                We&apos;re putting our YouTube channel together. Until then, our
                live clips and reels are on Instagram and TikTok.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <ButtonLink href={socials.instagram.href} external>
                  <InstagramIcon className="h-4 w-4" /> Instagram
                </ButtonLink>
                <ButtonLink href={socials.tiktok.href} external variant="ghost">
                  <TiktokIcon className="h-4 w-4" /> TikTok
                </ButtonLink>
              </div>
            </EmptyState>
          )}
        </Container>
      </section>
    </>
  );
}
