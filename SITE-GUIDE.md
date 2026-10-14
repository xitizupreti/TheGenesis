# The Genesis — website guide

Next.js 16 · React 19 · Tailwind CSS 4 · Nodemailer. Hosted on Vercel.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (what Vercel runs)
```

## Where to edit things

| What | File |
| --- | --- |
| Band name, tagline, about text, **formed year**, social links, members | `lib/band.ts` |
| Shows / events (delete the `demo: true` placeholder shows before launch) | `lib/shows.ts` |
| Videos: paste YouTube, Instagram reel or TikTok links | `lib/videos.ts` |
| Instagram / TikTok / Facebook / YouTube links | `socials` in `lib/band.ts` (YouTube icon shows without a link until set) |
| Page titles, descriptions, search-engine data | `lib/seo.ts` + `metadata` at the top of each `app/**/page.tsx` |
| Splash intro text | `components/SplashIntro.tsx` |
| Colours & fonts | `app/globals.css` (`@theme`) and `app/layout.tsx` |
| Band photos, logo, member photos | `public/images/` |

## Icons & link previews

Generated from `public/images/logo.webp` (the "G") and `public/images/cover.webp`:

```bash
npm run brand-assets
```

| File | Used for |
| --- | --- |
| `app/favicon.ico`, `app/icon.png` | Browser tab icon, Google search result icon |
| `app/apple-icon.png` | iPhone/iPad home screen |
| `public/icons/*` | Android home screen (via `app/manifest.ts`) |
| `public/images/share.jpg` | Preview card when the link is shared on Facebook, WhatsApp, Messenger, Instagram DMs, X, Discord… |

After changing the share image, paste the site URL into
https://developers.facebook.com/tools/debug/ and click **Scrape Again** so
Facebook/WhatsApp drop the old cached preview.

## After the first deploy (SEO)

1. **Google Search Console** → add `https://thegenesis-ksus.vercel.app` → verify with the
   "HTML tag" method: put the `content` value in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   on Vercel and redeploy → then submit `sitemap.xml`.
2. Add the website link to the Instagram, TikTok and Facebook bios — links from the
   band's own profiles help Google connect them to the site.

## Gallery albums

Every folder inside `public/gallery/` becomes an album. The folder name is the album name.

```
public/gallery/
  On Stage/
    01.webp
    02.webp
  Bhaktapur Durbar Square 2026/
    cover.jpg        ← optional: used as the album cover
    IMG_0012.jpg
    IMG_0013.jpg
```

- Supported: `.jpg .jpeg .png .webp .avif .gif` (upper or lower case, e.g. `IMG_0012.JPG`).
- **Not supported: iPhone `.HEIC`.** Browsers can't show it. Export as JPG first (on iPhone: Settings → Camera → Formats → Most Compatible; on Mac: Photos → Export).
- Only photos directly inside the album folder are used; subfolders and non-image files are ignored, and empty folders don't create an album.
- Folder names can be in Nepali. The title shows as written, and the URL gets a short code like `/gallery/album-115pn6x`.
- Albums and photos are sorted by name (numbers sort naturally: 2 before 10).
- Commit and push. Vercel rebuilds and the new album appears automatically.
- Keep photos to about 2000px on the long side so the repo stays small. The site resizes them for each screen.

## Contact form

Messages are emailed via SMTP. Set these in **Vercel → Project → Settings → Environment Variables**. For local testing, `cp .env.example .env.local` and fill it in:

| Variable | Example |
| --- | --- |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | the sending account |
| `SMTP_PASS` | Gmail **App Password** (not the normal password) |
| `CONTACT_TO` | inbox that receives messages |
| `NEXT_PUBLIC_BASE_URL` | optional — defaults to Vercel's production URL (`https://thegenesis-ksus.vercel.app`); set it if you add a custom domain |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | optional — Google Search Console code |

Hitting **Reply** on a contact email replies straight to the person who wrote in.
Until the SMTP variables are set, the form asks visitors to message on Instagram instead.
