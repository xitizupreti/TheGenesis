"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { band, navLinks } from "@/lib/band";
import SocialLinks from "@/components/SocialLinks";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  // Menu closes itself on navigation: it is only "open" for the page it was opened on
  const open = openOn === pathname;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // The menu is a sibling of <header>, not a child: the header's
  // backdrop-blur would otherwise trap this fixed element inside it.
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="font-display text-2xl leading-none tracking-wide text-bone"
            aria-label={`${band.name} — home`}
          >
            The <span className="text-rose">Genesis</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 font-heading text-sm uppercase tracking-[0.14em] transition ${
                    isActive(pathname, link.href)
                      ? "text-rose"
                      : "text-ash hover:text-bone"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-bone lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col justify-between overflow-y-auto overscroll-contain border-t border-line bg-ink px-6 pt-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-line/60">
                <Link
                  href={link.href}
                  onClick={() => setOpenOn(null)}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={`block py-3.5 font-heading text-2xl uppercase tracking-[0.12em] active:text-rose ${
                    isActive(pathname, link.href) ? "text-rose" : "text-bone"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ash">
              {band.tagline}
            </p>
            <SocialLinks />
          </div>
        </div>
      )}
    </>
  );
}
