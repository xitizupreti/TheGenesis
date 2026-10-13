// Shared by the contact form (client) and the API route (server)

export const ENQUIRY_TYPES = [
  "Booking / Gig",
  "Collaboration",
  "Press / Interview",
  "Fan mail",
  "Other",
] as const;

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  type: string;
  eventDate: string;
  venue: string;
  message: string;
  website: string; // honeypot — real visitors never see or fill this
};

export const LIMITS = {
  name: 100,
  email: 200,
  phone: 30,
  venue: 200,
  message: 5000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(p: Partial<ContactPayload>): string | null {
  if (!p.name?.trim()) return "Please enter your name.";
  if (!p.email?.trim() || !EMAIL_RE.test(p.email.trim()))
    return "Please enter a valid email address.";
  if (!p.type || !(ENQUIRY_TYPES as readonly string[]).includes(p.type))
    return "Please choose what you're getting in touch about.";
  if (!p.message?.trim() || p.message.trim().length < 10)
    return "Please write a message (at least 10 characters).";
  if (
    p.name.length > LIMITS.name ||
    p.email.length > LIMITS.email ||
    (p.phone?.length ?? 0) > LIMITS.phone ||
    (p.venue?.length ?? 0) > LIMITS.venue ||
    p.message.length > LIMITS.message
  )
    return "One of the fields is too long.";
  if (p.eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(p.eventDate))
    return "Please pick a valid event date.";
  return null;
}
