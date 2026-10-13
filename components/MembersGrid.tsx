import Image from "next/image";
import { members } from "@/lib/band";
import { InstagramIcon } from "@/components/icons";

// Card widths per breakpoint (flex-wrap + justify-center keeps a short last
// row centred). Phones: 2 per row, the 5th card full width in landscape —
// which suits the drummer's wide photo.
const itemWidth =
  "basis-[calc(50%-0.375rem)] sm:basis-[calc(50%-0.625rem)] md:basis-[calc(33.333%-0.834rem)] lg:basis-[calc(20%-1rem)]";

export default function MembersGrid() {
  return (
    <ul className="flex flex-wrap justify-center gap-3 sm:gap-5">
      {members.map((m, i) => {
        const isLast = i === members.length - 1;
        return (
          <li
            key={m.name}
            className={`shrink-0 grow-0 ${
              isLast ? "basis-full md:basis-[calc(33.333%-0.834rem)] lg:basis-[calc(20%-1rem)]" : itemWidth
            }`}
          >
            <a
              href={m.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="member-card group relative block overflow-hidden rounded-2xl border border-line bg-coal transition active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
              aria-label={`${m.name}, ${m.role} — Instagram ${m.handle}`}
            >
              <div
                className={`relative ${
                  isLast ? "aspect-[3/2] sm:aspect-[16/9] md:aspect-[3/4]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={m.photo}
                  alt={`${m.name}, ${m.role.toLowerCase()} of The Genesis`}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 50vw"
                  className="member-photo object-cover"
                  style={{ objectPosition: m.focus }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/25 to-transparent" />
              </div>

              <span className="absolute top-2.5 right-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone/25 bg-ink/55 text-bone backdrop-blur-sm transition group-hover:border-wine group-hover:bg-wine group-active:bg-wine sm:top-3 sm:right-3">
                <InstagramIcon className="h-4 w-4" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <p className="font-heading text-[0.65rem] uppercase tracking-[0.25em] text-rose sm:text-xs sm:tracking-[0.3em]">
                  {m.role}
                </p>
                <p className="mt-1 font-heading text-base leading-tight font-semibold uppercase break-words sm:text-lg xl:text-xl">
                  {m.name}
                </p>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
