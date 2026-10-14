import type { Metadata, Viewport } from "next";
import { Geist, Oswald, Rubik_Dirt } from "next/font/google";
import "./globals.css";
import SplashIntro from "@/components/SplashIntro";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { band } from "@/lib/band";
import {
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  bandJsonLd,
  pageMetadata,
  websiteJsonLd,
} from "@/lib/seo";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const rubikDirt = Rubik_Dirt({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rubik-dirt",
});

const DESCRIPTION =
  "The Genesis is a women-led rock band from Bhaktapur, Nepal, playing English rock and metal covers live. Shows, videos, photos and bookings.";

export const metadata: Metadata = {
  ...pageMetadata({ description: DESCRIPTION, path: "/" }),
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  creator: "Kshitiz Upreti",
  authors: [{ name: "Kshitiz Upreti", url: "https://kshitizupreti.com.np" }],
  publisher: SITE_NAME,
  category: "music",
  keywords: [
    "The Genesis",
    "The Genesis band",
    "The Genesis Nepal",
    "women-led band Nepal",
    "female rock band Nepal",
    "all-girl band Nepal",
    "Bhaktapur band",
    "rock band Bhaktapur",
    "metal cover band Nepal",
    "English cover band Kathmandu",
    "live band for events Nepal",
    "book a band Nepal",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    // "black-translucent" would slide the sticky header under the iPhone status bar
    statusBarStyle: "black",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  }),
  other: {
    "geo.region": "NP-P3",
    "geo.placename": band.location,
  },
};

export const viewport: Viewport = {
  themeColor: "#070507",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${oswald.variable} ${rubikDirt.variable}`}
    >
      <head>
        <JsonLd data={[bandJsonLd(), websiteJsonLd()]} />
      </head>
      <body className="flex min-h-screen flex-col bg-ink font-sans text-bone antialiased">
        <SplashIntro />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
