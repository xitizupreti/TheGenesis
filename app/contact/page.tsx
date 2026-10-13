import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { band, socials } from "@/lib/band";
import { pageMetadata } from "@/lib/seo";
import { Container, PageHero } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { FacebookIcon, InstagramIcon, TiktokIcon } from "@/components/icons";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Bookings",
  description: `Book ${band.name}, a women-led rock band from ${band.location}, for your concert, festival, college fest or private event. Or just say hello.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="Bookings, collaborations, press, or just to say hi — we read everything."
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-14">
          <ContactForm />

          <aside className="space-y-6">
            <div className="rounded-2xl border border-line bg-coal p-6">
              <h2 className="font-heading text-lg uppercase tracking-wide">Bookings</h2>
              <p className="mt-2 text-sm leading-relaxed text-ash">
                Planning a concert, festival, college fest or private event?
                Pick <span className="text-bone">Booking / Gig</span> in the form
                and share the date and venue — it helps us reply faster.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-coal p-6">
              <h2 className="font-heading text-lg uppercase tracking-wide">
                Message us directly
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={socials.instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-ash transition hover:text-rose"
                  >
                    <InstagramIcon className="h-5 w-5 text-rose" />
                    {socials.instagram.handle}
                  </a>
                </li>
                <li>
                  <a
                    href={socials.tiktok.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-ash transition hover:text-rose"
                  >
                    <TiktokIcon className="h-5 w-5 text-rose" />
                    {socials.tiktok.handle}
                  </a>
                </li>
                <li>
                  <a
                    href={socials.facebook.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-ash transition hover:text-rose"
                  >
                    <FacebookIcon className="h-5 w-5 text-rose" />
                    The Genesis on Facebook
                  </a>
                </li>
                <li className="inline-flex items-center gap-3 text-ash">
                  <MapPin className="h-5 w-5 text-rose" />
                  {band.location}
                </li>
              </ul>
              <SocialLinks size="sm" className="mt-5" />
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
