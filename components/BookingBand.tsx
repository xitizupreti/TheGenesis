import { ArrowRight } from "lucide-react";
import { ButtonLink, Container } from "@/components/ui";

export default function BookingBand() {
  return (
    <section className="relative isolate overflow-hidden border-t border-line">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-wine-deep via-ink to-ink" />
      <Container className="flex flex-col items-start justify-between gap-8 py-16 sm:py-20 md:flex-row md:items-center">
        <div>
          <h2 className="font-heading text-3xl font-semibold uppercase sm:text-4xl">
            Want The Genesis at your event?
          </h2>
          <p className="mt-3 max-w-xl text-ash">
            Concerts, college fests, private events, collaborations — tell us
            what you have in mind.
          </p>
        </div>
        <ButtonLink href="/contact">
          Get in touch <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </Container>
    </section>
  );
}
