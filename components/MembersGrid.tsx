import Image from "next/image";
import { members } from "@/lib/band";
import { InstagramIcon } from "@/components/icons";

export default function MembersGrid() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
      {members.map((m, i) => (
        <li
          key={m.name}
          // Five cards: on two-column phones the last one spans the row
          className={i === members.length - 1 ? "col-span-2 md:col-span-1" : ""}
        >
          <a
            href={m.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-2xl border border-line bg-coal"
            aria-label={`${m.name}, ${m.role} — Instagram ${m.handle}`}
          >
            <div
              className={`relative ${
                i === members.length - 1
                  ? "aspect-[3/2] md:aspect-[3/4]"
                  : "aspect-[3/4]"
              }`}
            >
              <Image
                src={m.photo}
                alt={`${m.name}, ${m.role.toLowerCase()} of The Genesis`}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                style={{ objectPosition: m.focus }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
              <div className="min-w-0">
                <p className="font-heading text-[0.65rem] uppercase tracking-[0.3em] text-rose sm:text-xs">
                  {m.role}
                </p>
                <p className="mt-1 truncate font-heading text-lg leading-tight font-semibold uppercase sm:text-xl">
                  {m.name}
                </p>
              </div>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bone/30 bg-ink/50 text-bone transition group-hover:border-wine group-hover:bg-wine">
                <InstagramIcon className="h-4 w-4" />
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
