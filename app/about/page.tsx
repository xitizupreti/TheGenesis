import type { Metadata } from "next";
import Image from "next/image";
import { band, members } from "@/lib/band";
import { pageMetadata } from "@/lib/seo";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import MembersGrid from "@/components/MembersGrid";
import BookingBand from "@/components/BookingBand";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description: `Meet ${band.name}: a women-led rock band from ${band.location} playing ${band.plays}. Our story, our name and the five women behind it.`,
  path: "/about",
});

export default function AboutPage() {
  const facts = [
    { label: "Based in", value: band.location },
    { label: "Formed", value: band.formedYear || "____" },
    { label: "We play", value: band.plays },
    { label: "Line-up", value: `${members.length} members, all women` },
  ];

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="The Beginning"
        intro="A women-led band from Bhaktapur, here to make some noise."
        image="/images/group.webp"
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div className="relative">
            <div className="absolute inset-0 -z-10 scale-105 rounded-3xl bg-wine/20 blur-2xl" />
            <Image
              src="/images/group.webp"
              alt="The members of The Genesis together in the studio"
              width={1200}
              height={1200}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="h-auto w-full rounded-2xl border border-line"
            />
          </div>

          <div>
            <SectionHeading eyebrow="Our story" title="Who we are" />
            <div className="space-y-5 text-lg leading-relaxed text-ash">
              {band.about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="bg-coal px-5 py-4">
                  <dt className="font-heading text-xs uppercase tracking-[0.25em] text-rose">
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-bone">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="font-heading text-sm uppercase tracking-[0.2em] text-ash">
                Follow us
              </span>
              <SocialLinks />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-coal/50 py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Line-up" title="The band" />
          <MembersGrid />
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid items-center gap-12 md:grid-cols-2">
          <Image
            src="/images/logo.webp"
            alt="The Genesis logo"
            width={1232}
            height={1540}
            sizes="(min-width: 768px) 40vw, 90vw"
            className="mx-auto h-auto w-full max-w-sm rounded-2xl border border-line"
          />
          <div>
            <p className="mb-3 font-heading text-xs uppercase tracking-[0.35em] text-rose">
              The name
            </p>
            <h2 className="font-heading text-3xl font-semibold uppercase sm:text-4xl">
              Genesis <span className="block text-2xl text-ash sm:inline sm:text-4xl">/ˈdʒɛnɪsɪs/</span>
            </h2>
            <p className="mt-2 font-heading uppercase tracking-[0.2em] text-ash">
              noun · the origin, the beginning
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ash">
              Every scene needs a starting point. For us, The Genesis is ours —
              and we hope it is the start of something for everyone who comes to
              a show.
            </p>
          </div>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
