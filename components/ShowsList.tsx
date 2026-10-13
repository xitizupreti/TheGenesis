"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CalendarDays, Clock, MapPin, Ticket } from "lucide-react";
import { shows, todayInNepal, type Show } from "@/lib/shows";
import { socials } from "@/lib/band";
import { EmptyState } from "@/components/ui";

const noopSubscribe = () => () => {};

// Pages are pre-rendered at build time, so the server's idea of "today" is the
// deploy date. The visitor's browser re-checks, so a gig that has happened
// since the last deploy still moves into "Past" without a redeploy.
function useToday(buildDate: string) {
  return useSyncExternalStore(noopSubscribe, todayInNepal, () => buildDate);
}

function formatParts(date: string) {
  const d = new Date(`${date}T00:00:00`);
  return {
    day: d.toLocaleDateString("en-US", { day: "2-digit" }),
    month: d.toLocaleDateString("en-US", { month: "short" }),
    year: d.getFullYear(),
    weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
  };
}

function ShowRow({ show, past }: { show: Show; past?: boolean }) {
  const p = formatParts(show.date);
  return (
    <li
      className={`flex flex-col gap-4 rounded-2xl border border-line bg-coal p-5 sm:flex-row sm:items-center sm:gap-6 ${
        past ? "opacity-70" : ""
      }`}
    >
      <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-wine-deep/60 text-center">
        <span className="font-heading text-xs uppercase tracking-[0.2em] text-rose">
          {p.month}
        </span>
        <span className="font-heading text-3xl leading-none font-semibold">{p.day}</span>
        <span className="text-[0.65rem] text-ash">{p.year}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-xl uppercase tracking-wide">{show.title}</h3>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ash">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-rose" />
            {show.venue}, {show.city}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-rose" />
            {p.weekday}
          </span>
          {show.time && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-rose" />
              {show.time}
            </span>
          )}
        </div>
        {show.note && <p className="mt-2 text-sm text-bone/80">{show.note}</p>}
      </div>
      {!past && show.ticketUrl && (
        <a
          href={show.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-wine px-5 py-2.5 font-heading text-sm uppercase tracking-[0.16em] transition hover:bg-rose hover:text-ink"
        >
          <Ticket className="h-4 w-4" />
          Tickets
        </a>
      )}
    </li>
  );
}

export default function ShowsList({
  buildDate,
  limit,
  showPast = true,
}: {
  buildDate: string;
  limit?: number;
  showPast?: boolean;
}) {
  const today = useToday(buildDate);
  const sorted = [...shows].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter((s) => s.date >= today).slice(0, limit);
  const past = sorted.filter((s) => s.date < today).reverse();

  return (
    <div className="space-y-12">
      {upcoming.length > 0 ? (
        <ul className="space-y-4">
          {upcoming.map((s) => (
            <ShowRow key={`${s.date}-${s.title}`} show={s} />
          ))}
        </ul>
      ) : (
        <EmptyState icon={<CalendarDays className="h-6 w-6" />} title="No shows announced yet">
          New dates are on the way. Follow us on{" "}
          <a
            href={socials.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose underline-offset-4 hover:underline"
          >
            Instagram
          </a>{" "}
          to hear first — or{" "}
          <Link href="/contact" className="text-rose underline-offset-4 hover:underline">
            book us
          </Link>{" "}
          for your event.
        </EmptyState>
      )}

      {showPast && past.length > 0 && (
        <div>
          <h2 className="mb-5 font-heading text-2xl uppercase tracking-wide text-ash">
            Past shows
          </h2>
          <ul className="space-y-4">
            {past.map((s) => (
              <ShowRow key={`${s.date}-${s.title}`} show={s} past />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
