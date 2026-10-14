import type { Metadata } from "next";
import { band } from "@/lib/band";
import { shows, todayInNepal } from "@/lib/shows";
import { eventsJsonLd, pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { Container, PageHero } from "@/components/ui";
import ShowsList from "@/components/ShowsList";
import BookingBand from "@/components/BookingBand";

export const metadata: Metadata = pageMetadata({
  title: "Shows & Events",
  description: `Upcoming gigs and past live shows by ${band.name}, the women-led rock band from ${band.location}. Find dates, venues and tickets.`,
  path: "/shows",
});

const realShows = shows.filter((s) => !s.demo);

export default function ShowsPage() {
  return (
    <>
      {realShows.length > 0 && <JsonLd data={eventsJsonLd(realShows)} />}
      <PageHero
        eyebrow="Live"
        title="Shows & Events"
        intro="Where to catch us next — and where we've been."
      />
      <section className="py-16 sm:py-20">
        <Container>
          <ShowsList buildDate={todayInNepal()} />
        </Container>
      </section>
      <BookingBand />
    </>
  );
}
