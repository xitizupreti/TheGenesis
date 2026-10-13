import Link from "next/link";
import { MapPin } from "lucide-react";
import { band, navLinks } from "@/lib/band";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-coal">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-display text-3xl leading-none">
            The <span className="text-rose">Genesis</span>
          </Link>
          <p className="mt-3 text-sm uppercase tracking-[0.25em] text-ash">
            {band.tagline}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-ash">
            <MapPin className="h-4 w-4 text-rose" />
            {band.location}
          </p>
        </div>

        <div>
          <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-bone">
            Explore
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ash transition hover:text-rose">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-bone">
            Follow
          </h2>
          <SocialLinks className="mt-4" />
          <Link
            href="/contact"
            className="mt-5 inline-block text-sm text-rose underline-offset-4 hover:underline"
          >
            Booking enquiries →
          </Link>
        </div>
      </div>
      <div className="border-t border-line/60">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-ash/80 sm:px-6">
          © {new Date().getFullYear()} {band.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
