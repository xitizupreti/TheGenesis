import { socials, type Social } from "@/lib/band";
import { FacebookIcon, InstagramIcon, TiktokIcon, YoutubeIcon } from "@/components/icons";

const items: { social: Social; Icon: typeof InstagramIcon }[] = [
  { social: socials.instagram, Icon: InstagramIcon },
  { social: socials.tiktok, Icon: TiktokIcon },
  { social: socials.facebook, Icon: FacebookIcon },
  { social: socials.youtube, Icon: YoutubeIcon },
];

export default function SocialLinks({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const box = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const icon = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {items.map(({ social, Icon }) => (
        <li key={social.label}>
          {social.href ? (
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
              className={`${box} inline-flex items-center justify-center rounded-full border border-line text-bone transition hover:border-wine hover:bg-wine hover:text-bone`}
            >
              <Icon className={icon} />
            </a>
          ) : (
            <span
              title={`${social.label} — coming soon`}
              aria-label={`${social.label} (coming soon)`}
              role="img"
              className={`${box} inline-flex cursor-default items-center justify-center rounded-full border border-line text-ash/60`}
            >
              <Icon className={icon} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
