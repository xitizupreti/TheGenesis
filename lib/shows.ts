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
  // Placeholder gigs: shown on the site but never sent to Google as real events
  demo?: boolean;
};

export const shows: Show[] = [
  // ---- DEMO SHOWS — delete these once real dates are added ----
  {
    date: "2026-10-25",
    title: "Rock Night Demo",
    venue: "Demo Venue",
    city: "Bhaktapur",
    time: "7:00 PM",
    ticketUrl: "https://example.com/tickets",
    note: "Demo show — replace with a real gig.",
    demo: true,
  },
  {
    date: "2026-11-15",
    title: "Metal Mayhem Demo",
    venue: "Demo Club",
    city: "Kathmandu",
    time: "8:00 PM",
    note: "Free entry",
    demo: true,
  },
  {
    date: "2026-12-20",
    title: "Winter Unplugged Demo",
    venue: "Demo Café",
    city: "Lalitpur",
    time: "6:00 PM",
    demo: true,
  },
  {
    date: "2027-01-10",
    title: "New Year Rock Fest Demo",
    venue: "Demo Grounds",
    city: "Bhaktapur",
    demo: true,
  },
  {
    date: "2026-09-06",
    title: "Rock Night Demo — Vol. 1",
    venue: "Demo Venue",
    city: "Bhaktapur",
    demo: true,
  },
  {
    date: "2026-08-15",
    title: "College Fest Demo",
    venue: "Demo College",
    city: "Kathmandu",
    demo: true,
  },
];

export function todayInNepal(): string {
  // en-CA formats as YYYY-MM-DD, which compares correctly as a string
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
  }).format(new Date());
}
