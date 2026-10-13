// Add gigs here. Upcoming vs. past is worked out automatically from the date
// (Nepal time), so a show moves to "Past" on its own the day after it happens.
//
// Example:
// {
//   date: "2026-11-21",
//   title: "Rock Night",
//   venue: "Purple Haze",
//   city: "Kathmandu",
//   time: "7:00 PM",
//   ticketUrl: "https://...",
//   note: "Free entry",
// },

export type Show = {
  date: string; // YYYY-MM-DD
  title: string;
  venue: string;
  city: string;
  time?: string;
  ticketUrl?: string;
  note?: string;
};

export const shows: Show[] = [];

export function todayInNepal(): string {
  // en-CA formats as YYYY-MM-DD, which compares correctly as a string
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
  }).format(new Date());
}
