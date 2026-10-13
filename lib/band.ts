// Everything about the band lives here — edit text, links and members in one place.

export const band = {
  name: "The Genesis",
  shortTagline: "The Beginning",
  tagline: "Women-led band · The Beginning ✨",
  location: "Bhaktapur, Nepal",
  // Fill in when ready, e.g. "2024". Until then the site shows "____" on the
  // About page (and in README.md) as a reminder.
  formedYear: "",
  plays: "English rock & metal covers",
  description:
    "The Genesis is a women-led rock band from Bhaktapur, Nepal, playing English rock and metal covers.",
  about: [
    "The Genesis is a women-led rock band from Bhaktapur, Nepal. The name means “the beginning” — and that is exactly what we set out to be: five musicians holding the mic, the guitars, the bass and the sticks, and taking up the space on stage that women have always deserved.",
    "We play English rock and metal covers — the songs we grew up on, played loud and played our way. From the rehearsal room to the big stage, every set is about one thing: giving the crowd everything we have.",
    "If you are a girl who just picked up an instrument and wonders whether there is room for you up here — there is. This is only the beginning.",
  ],
};

export type Social = {
  label: string;
  href: string; // empty string = not live yet, icon is shown without a link
  handle?: string;
};

export const socials = {
  instagram: {
    label: "Instagram",
    href: "https://www.instagram.com/thegenesis_____",
    handle: "@thegenesis_____",
  },
  tiktok: {
    label: "TikTok",
    href: "https://www.tiktok.com/@the_genesis92",
    handle: "@the_genesis92",
  },
  facebook: {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61567087036193",
  },
  youtube: {
    label: "YouTube",
    href: "",
  },
} satisfies Record<string, Social>;

export type Member = {
  name: string;
  role: string;
  photo: string;
  // CSS object-position so faces stay in frame when the photo is cropped
  focus: string;
  instagram: string;
  handle: string;
};

export const members: Member[] = [
  {
    name: "Aishworya Thapa",
    role: "Vocals",
    photo: "/images/members/aishworya.webp",
    focus: "50% 25%",
    instagram: "https://www.instagram.com/aishworyathapa_/",
    handle: "@aishworyathapa_",
  },
  {
    name: "Sristi Shrestha",
    role: "Lead Guitar",
    photo: "/images/members/sristi.webp",
    focus: "50% 40%",
    instagram: "https://www.instagram.com/srist.shrestha/",
    handle: "@srist.shrestha",
  },
  {
    name: "Reeya",
    role: "Guitar",
    photo: "/images/members/reeya.webp",
    focus: "50% 30%",
    instagram: "https://www.instagram.com/a_vocaddho/",
    handle: "@a_vocaddho",
  },
  {
    name: "k_sus",
    role: "Bass",
    photo: "/images/members/ksus.webp",
    focus: "45% 20%",
    instagram: "https://www.instagram.com/k_sus0/",
    handle: "@k_sus0",
  },
  {
    name: "Sadikshya Bagale",
    role: "Drums",
    photo: "/images/members/sadikshya.webp",
    focus: "55% 30%",
    instagram: "https://www.instagram.com/sadikshya_bagale/",
    handle: "@sadikshya_bagale",
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/shows", label: "Shows" },
  { href: "/music", label: "Music" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];
