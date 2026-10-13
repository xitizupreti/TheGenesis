import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-heading text-xs uppercase tracking-[0.4em] text-rose">404</p>
      <h1 className="mt-3 font-display text-5xl sm:text-7xl">Off the setlist</h1>
      <p className="mt-4 max-w-md text-ash">
        This page doesn&apos;t exist — but the show goes on.
      </p>
      <div className="mt-8">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </Container>
  );
}
