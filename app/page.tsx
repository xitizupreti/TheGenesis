import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { band } from "@/lib/band";
import { getAlbums } from "@/lib/gallery";
import { todayInNepal } from "@/lib/shows";
import { videos } from "@/lib/videos";
import { ButtonLink, Container, EmptyState, SectionHeading } from "@/components/ui";
import SocialLinks from "@/components/SocialLinks";
import MembersGrid from "@/components/MembersGrid";
import ShowsList from "@/components/ShowsList";
import VideoGrid from "@/components/VideoGrid";
import AlbumCard from "@/components/AlbumCard";
import { YoutubeIcon } from "@/components/icons";
import BookingBand from "@/components/BookingBand";

export default function HomePage() {
  const albums = getAlbums().slice(0, 3);

  return (
    <>
      {/* Cover + profile, like a social profile header */}
      <section className="relative">
        <div className="relative h-[52vh] min-h-[280px] w-full overflow-hidden sm:h-[68vh] sm:max-h-[720px]">
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

        <Container className="relative -mt-20 sm:-mt-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-8">
            <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 border-ink shadow-2xl ring-2 ring-wine sm:h-44 sm:w-44">
              <Image
                src="/images/group.webp"
                alt="The Genesis band members together"
                fill
                priority
                sizes="176px"
                className="object-cover object-[50%_55%]"
              />
            </div>
            <div className="flex-1 pb-1">
              <p className="font-heading text-xs uppercase tracking-[0.4em] text-rose">
                Women-led band 💛
              </p>
              <h1 className="mt-2 font-display text-5xl leading-none sm:text-7xl">
                The Genesis
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-ash">
                <span className="font-heading uppercase tracking-[0.25em]">
                  {band.shortTagline} ✨
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm">
                  <MapPin className="h-4 w-4 text-rose" />
                  {band.location}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4 pb-1 sm:flex-row sm:items-center md:flex-col md:items-end">
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
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 -z-10 rounded-full bg-wine/25 blur-3xl" />
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
          {videos.length > 0 ? (
            <VideoGrid videos={videos.slice(0, 2)} />
          ) : (
            <EmptyState icon={<YoutubeIcon className="h-6 w-6" />} title="Videos coming soon">
              Our YouTube channel is on the way. Until then, catch our live clips
              on Instagram and TikTok.
            </EmptyState>
          )}
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
