import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { band } from "@/lib/band";
import { getAlbums } from "@/lib/gallery";
import { todayInNepal } from "@/lib/shows";
import { shortVideos, youtubeVideos } from "@/lib/videos";
import { ButtonLink, Container, EmptyState, SectionHeading } from "@/components/ui";
import SocialLinks from "@/components/SocialLinks";
import MembersGrid from "@/components/MembersGrid";
import ShowsList from "@/components/ShowsList";
import VideoGrid, { ShortVideoGrid } from "@/components/VideoGrid";
import FollowStrip from "@/components/FollowStrip";
import AlbumCard from "@/components/AlbumCard";
import { YoutubeIcon } from "@/components/icons";
import BookingBand from "@/components/BookingBand";

export default function HomePage() {
  const albums = getAlbums().slice(0, 3);

  return (
    <>
      {/* Cover + profile, like a social profile header */}
      <section className="relative">
        <div className="relative h-[44svh] min-h-[240px] w-full overflow-hidden sm:h-[56svh] lg:h-[68svh] lg:max-h-[720px]">
          <Image
            src="/images/cover.webp"
            alt="The Genesis performing live on stage"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_40%]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-ink/10 via-transparent to-ink" />
        </div>

        <Container className="relative -mt-16 sm:-mt-20 lg:-mt-24">
          {/* Phones/tablets: centred profile stack. Laptops+: one row */}
          <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:items-end lg:gap-8 lg:text-left">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-ink shadow-2xl ring-2 ring-wine sm:h-40 sm:w-40 lg:h-44 lg:w-44">
              <Image
                src="/images/group.webp"
                alt="The Genesis band members together"
                fill
                priority
                sizes="176px"
                className="object-cover object-[50%_55%]"
              />
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <p className="font-heading text-xs uppercase tracking-[0.4em] text-rose">
                Women-led band 💛
              </p>
              <h1 className="mt-2 font-display text-[2.6rem] leading-none min-[400px]:text-5xl sm:text-6xl xl:text-7xl">
                The Genesis
              </h1>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-ash lg:justify-start">
                <span className="font-heading uppercase tracking-[0.25em]">
                  {band.shortTagline} ✨
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm">
                  <MapPin className="h-4 w-4 text-rose" />
                  {band.location}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 pb-1 sm:flex-row lg:flex-col lg:items-end">
              <SocialLinks />
              <ButtonLink href="/contact">
                Book the band <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mb-3 font-heading text-xs uppercase tracking-[0.35em] text-rose">
              The beginning
            </p>
            <h2 className="font-heading text-4xl leading-tight font-semibold uppercase sm:text-5xl">
              Five women.
              <br />
              <span className="text-rose">One loud beginning.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash">
              {band.about[0]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about">Our story</ButtonLink>
              <ButtonLink href="/gallery" variant="ghost">
                See the gallery
              </ButtonLink>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[18rem] sm:max-w-sm">
            <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-wine/25 blur-3xl" />
            <Image
              src="/images/logo.webp"
              alt="The Genesis logo"
              width={1232}
              height={1540}
              sizes="(min-width: 768px) 384px, 90vw"
              className="h-auto w-full rounded-2xl border border-line"
            />
          </div>
        </Container>
      </section>

      {/* Line-up */}
      <section className="border-t border-line bg-coal/50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Line-up"
            title="Meet the band"
            action={{ href: "/about", label: "About us" }}
          />
          <MembersGrid />
        </Container>
      </section>

      {/* Shows */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Live"
            title="Upcoming shows"
            action={{ href: "/shows", label: "All shows" }}
          />
          <ShowsList buildDate={todayInNepal()} limit={3} showPast={false} />
        </Container>
      </section>

      {/* Videos */}
      <section className="border-t border-line bg-coal/50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Watch"
            title="Music & videos"
            action={{ href: "/music", label: "All videos" }}
          />
          <div className="space-y-10">
            {youtubeVideos.length > 0 ? (
              <VideoGrid
                videos={youtubeVideos.slice(0, 2)}
                featureFirst={youtubeVideos.length === 1}
              />
            ) : shortVideos.length > 0 ? (
              <ShortVideoGrid videos={shortVideos.slice(0, 3)} />
            ) : (
              <EmptyState icon={<YoutubeIcon className="h-6 w-6" />} title="Videos coming soon">
                Our YouTube channel is on the way. Until then, catch our live clips
                on Instagram and TikTok.
              </EmptyState>
            )}
            <FollowStrip />
          </div>
        </Container>
      </section>

      {/* Gallery preview */}
      {albums.length > 0 && (
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Gallery"
              title="Latest albums"
              action={{ href: "/gallery", label: "All albums" }}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((a) => (
                <AlbumCard key={a.slug} album={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <BookingBand />
    </>
  );
}
