import Link from "next/link";
import Image from "next/image";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
      <div>
        {eyebrow && (
          <p className="mb-2 font-heading text-xs uppercase tracking-[0.35em] text-rose">
            {eyebrow}
          </p>
        )}
        <h2 className="font-heading text-[1.75rem] leading-tight font-semibold uppercase tracking-wide text-bone sm:text-4xl">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className="font-heading text-sm uppercase tracking-[0.18em] text-ash transition hover:text-rose"
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) {
  const styles =
    variant === "primary"
      ? "bg-wine text-bone hover:bg-rose hover:text-ink"
      : "border border-line text-bone hover:border-rose hover:text-rose";
  const className = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-heading text-sm uppercase tracking-[0.18em] transition ${styles}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

// Banner used at the top of inner pages
export function PageHero({
  eyebrow,
  title,
  intro,
  image = "/images/cover.webp",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-30 grayscale"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink/40 via-ink/70 to-ink" />
      <Container className="py-14 sm:py-24 lg:py-28">
        <p className="mb-3 font-heading text-xs uppercase tracking-[0.4em] text-rose">
          {eyebrow}
        </p>
        <h1 className="font-display text-[2.6rem] leading-[1.05] break-words min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-base text-ash sm:text-lg">{intro}</p>}
      </Container>
    </section>
  );
}

export function EmptyState({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-coal/60 px-5 py-10 text-center sm:px-6 sm:py-14">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-wine-deep/60 text-rose">
        {icon}
      </div>
      <h3 className="font-heading text-xl uppercase tracking-wide">{title}</h3>
      {children && <div className="mt-3 max-w-md text-ash">{children}</div>}
    </div>
  );
}
