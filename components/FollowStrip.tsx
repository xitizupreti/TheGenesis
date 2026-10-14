import { socials } from "@/lib/band";
import { ButtonLink } from "@/components/ui";
import { InstagramIcon, TiktokIcon, YoutubeIcon } from "@/components/icons";

// Always-visible "more videos" links, so Instagram/TikTok stay one tap away
// even after videos are added to the page
export default function FollowStrip({ text }: { text?: string }) {
  const links = [
    { social: socials.instagram, Icon: InstagramIcon },
    { social: socials.tiktok, Icon: TiktokIcon },
    { social: socials.youtube, Icon: YoutubeIcon },
  ].filter(({ social }) => social.href);

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-coal/60 px-5 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
      <p className="max-w-md text-ash">
        {text ?? "More live clips, reels and behind-the-scenes on our socials."}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {links.map(({ social, Icon }, i) => (
          <ButtonLink
            key={social.label}
            href={social.href}
            external
            variant={i === 0 ? "primary" : "ghost"}
          >
            <Icon className="h-4 w-4" /> {social.label}
          </ButtonLink>
        ))}
      </div>
    </div>
  );
}
