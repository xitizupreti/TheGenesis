import { NextRequest, NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";
import { escapeHtml, mailerConfigured, transporter } from "@/lib/mailer";

function row(label: string, value: string) {
  return `
    <tr style="border-bottom:1px solid #2a2027">
      <td style="padding:10px 0;color:#a39aa1;width:120px;font-weight:600;vertical-align:top">${label}</td>
      <td style="padding:10px 0;color:#efe9dd">${value}</td>
    </tr>`;
}

const str = (v: unknown) => (typeof v === "string" ? v : "");

export async function POST(req: NextRequest) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Only accept string fields, whatever the client sent
  const body: ContactPayload = {
    name: str(raw?.name),
    email: str(raw?.email),
    phone: str(raw?.phone),
    type: str(raw?.type),
    eventDate: str(raw?.eventDate),
    venue: str(raw?.venue),
    message: str(raw?.message),
    website: str(raw?.website),
  };

  // Bots fill every field; pretend it worked so they don't retry
  if (body.website) return NextResponse.json({ success: true });

  const error = validateContact(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  if (!mailerConfigured()) {
    console.error("Contact form: SMTP_* / CONTACT_TO environment variables are not set");
    return NextResponse.json(
      { error: "The contact form isn't set up yet. Please message us on Instagram." },
      { status: 503 }
    );
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const type = body.type;
  const phone = body.phone.trim();
  const eventDate = body.eventDate;
  const venue = body.venue.trim();
  const message = body.message.trim();

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:auto;background:#070507;color:#efe9dd;border-radius:16px;overflow:hidden;border:1px solid #2a2027">
      <div style="padding:20px 24px;border-bottom:1px solid #2a2027">
        <p style="margin:0;font-size:12px;letter-spacing:0.25em;text-transform:uppercase;color:#e46a9c">New enquiry · ${escapeHtml(type)}</p>
        <h2 style="margin:6px 0 0;font-size:20px;color:#efe9dd">The Genesis — website contact form</h2>
      </div>
      <div style="padding:8px 24px 24px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${row("Name", escapeHtml(name))}
          ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#e46a9c">${escapeHtml(email)}</a>`)}
          ${row("Phone", escapeHtml(phone) || "—")}
          ${row("Type", escapeHtml(type))}
          ${eventDate ? row("Event date", escapeHtml(eventDate)) : ""}
          ${venue ? row("Venue / city", escapeHtml(venue)) : ""}
        </table>
        <div style="margin-top:18px;padding:16px;background:#110c10;border-radius:10px;border-left:4px solid #a32a5e">
          <p style="margin:0 0 6px;color:#a39aa1;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em">Message</p>
          <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
        <p style="margin:16px 0 0;font-size:11px;color:#6b6168">
          Submitted ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" })} NPT · Hit reply to answer ${escapeHtml(name)} directly.
        </p>
      </div>
    </div>`;

  const text = [
    `New enquiry: ${type}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    eventDate && `Event date: ${eventDate}`,
    venue && `Venue / city: ${venue}`,
    "",
    message,
  ]
    .filter((line) => line !== "")
    .join("\n");

  try {
    await transporter.sendMail({
      from: `"The Genesis Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: { name, address: email },
      subject: `[The Genesis] ${type} — ${name}`.replace(/[\r\n]+/g, " "),
      text,
      html,
    });
  } catch (err) {
    console.error("Contact form: failed to send email", err);
    return NextResponse.json(
      { error: "Sorry, your message couldn't be sent. Please try again or message us on Instagram." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
