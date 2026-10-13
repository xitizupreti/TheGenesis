"use client";

import { useState } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import {
  ENQUIRY_TYPES,
  LIMITS,
  validateContact,
  type ContactPayload,
} from "@/lib/contact";

const EMPTY: ContactPayload = {
  name: "",
  email: "",
  phone: "",
  type: ENQUIRY_TYPES[0],
  eventDate: "",
  venue: "",
  message: "",
  website: "",
};

const field =
  "w-full rounded-xl border border-line bg-ink px-4 py-3 text-bone placeholder:text-ash/50 outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/30";
const label = "mb-2 block font-heading text-xs uppercase tracking-[0.2em] text-ash";

export default function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const isBooking = form.type === ENQUIRY_TYPES[0];

  function update<K extends keyof ContactPayload>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = isBooking ? form : { ...form, eventDate: "", venue: "" };
    const problem = validateContact(payload);
    if (problem) {
      setError(problem);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
      setForm(EMPTY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-line bg-coal px-6 py-14 text-center">
        <CircleCheck className="h-12 w-12 text-rose" />
        <h2 className="mt-4 font-heading text-2xl uppercase tracking-wide">Message sent</h2>
        <p className="mt-2 max-w-sm text-ash">
          Thanks for reaching out. We&apos;ll get back to you soon. 💛
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-heading text-sm uppercase tracking-[0.18em] text-rose hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-line bg-coal p-5 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name *
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={field}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={field}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone <span className="normal-case tracking-normal text-ash/60">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={field}
            placeholder="98XXXXXXXX"
          />
        </div>
        <div>
          <label htmlFor="type" className={label}>
            Enquiry *
          </label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={(e) => update("type", e.target.value)}
            className={field}
          >
            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {isBooking && (
          <>
            <div>
              <label htmlFor="eventDate" className={label}>
                Event date <span className="normal-case tracking-normal text-ash/60">(optional)</span>
              </label>
              <input
                id="eventDate"
                name="eventDate"
                type="date"
                value={form.eventDate}
                onChange={(e) => update("eventDate", e.target.value)}
                className={`${field} min-h-[50px] [color-scheme:dark]`}
              />
            </div>
            <div>
              <label htmlFor="venue" className={label}>
                Venue / city <span className="normal-case tracking-normal text-ash/60">(optional)</span>
              </label>
              <input
                id="venue"
                name="venue"
                maxLength={LIMITS.venue}
                value={form.venue}
                onChange={(e) => update("venue", e.target.value)}
                className={field}
                placeholder="e.g. Durbar Square, Bhaktapur"
              />
            </div>
          </>
        )}
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={LIMITS.message}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${field} resize-y`}
          placeholder={
            isBooking
              ? "Tell us about the event: type of event, expected crowd, set length, budget…"
              : "What's on your mind?"
          }
        />
      </div>

      {/* Honeypot: hidden from people, irresistible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      {status === "error" && error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-wine/60 bg-wine-deep/30 px-4 py-3 text-sm text-bone"
        >
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-wine px-6 py-3.5 font-heading text-sm uppercase tracking-[0.2em] text-bone transition hover:bg-rose hover:text-ink disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send message
          </>
        )}
      </button>
    </form>
  );
}
