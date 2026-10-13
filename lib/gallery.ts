import fs from "node:fs";
import path from "node:path";

// Every folder inside public/gallery becomes an album, named after the folder.
// Drop photos in, push, and Vercel's build picks them up. A file named
// "cover.jpg" (any image extension) is used as the album cover; otherwise
// the first photo is.

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;
const COVER_NAME = /^cover\./i;

export type Album = {
  slug: string;
  name: string;
  cover: string;
  photos: string[];
};

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

// URLs stay plain ASCII: Next.js can't reliably serve pre-built pages whose
// path contains non-Latin characters. A folder named only in Nepali (or any
// other script) gets a short stable code instead; the album title on the
// page still shows the real folder name.
function slugify(name: string) {
  const ascii = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // drop accents: é → e
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (ascii) return ascii;

  let hash = 5381;
  for (const ch of name) hash = ((hash * 33) ^ ch.codePointAt(0)!) >>> 0;
  return `album-${hash.toString(36)}`;
}

function publicUrl(folder: string, file: string) {
  return `/gallery/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

export function getAlbums(): Album[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];

  const folders = fs
    .readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("."))
    .map((d) => d.name)
    .sort(collator.compare);

  const usedSlugs = new Set<string>();
  const albums: Album[] = [];

  for (const folder of folders) {
    const files = fs
      .readdirSync(path.join(GALLERY_DIR, folder))
      .filter((f) => IMAGE_EXT.test(f) && !f.startsWith("."))
      .sort(collator.compare);
    if (files.length === 0) continue;

    const coverFile = files.find((f) => COVER_NAME.test(f));
    const photos = files.filter((f) => f !== coverFile);
    if (photos.length === 0 && coverFile) photos.push(coverFile);

    let slug = slugify(folder);
    for (let n = 2; usedSlugs.has(slug); n++) slug = `${slugify(folder)}-${n}`;
    usedSlugs.add(slug);

    albums.push({
      slug,
      name: folder,
      cover: publicUrl(folder, coverFile ?? photos[0]),
      photos: photos.map((f) => publicUrl(folder, f)),
    });
  }

  return albums;
}

export function getAlbum(slug: string): Album | undefined {
  return getAlbums().find((a) => a.slug === slug);
}
