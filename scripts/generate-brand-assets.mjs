// Builds favicons, app icons and link-preview images from the band logo and
// cover photo. Re-run after changing either:  npm run brand-assets
//
// Outputs:
//   app/favicon.ico, app/icon.png, app/apple-icon.png      (browser + iOS icons)
//   public/icons/icon-192.png, icon-512.png, maskable-512.png  (web app manifest)
//   public/images/share.jpg                                 (1200×630 link preview)

import fs from "node:fs/promises";
import sharp from "sharp";

const LOGO = "public/images/logo.webp";
const COVER = "public/images/cover.webp";

const BONE = "#efe9dd";
const WINE = "#a32a5e";
const INK = "#070507";

// Regions of the 1232×1540 logo
const G_REGION = { left: 22, top: 752, width: 228, height: 244 }; // the "G"
const WORD_REGION = { left: 0, top: 600, width: 1232, height: 420 }; // "THE Genesis"

// Cut the light lettering out of the dark logo background as a bone-coloured
// PNG with transparency. The median filter removes the thin fibre lines.
async function cutout(region) {
  const { width, height } = region;
  const mask = await sharp(LOGO)
    .extract(region)
    .greyscale()
    .median(7)
    .threshold(180)
    .toColourspace("b-w")
    .raw()
    .toBuffer();
  return sharp({ create: { width, height, channels: 3, background: BONE } })
    .joinChannel(mask, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
}

function tile(size, { radius, inset }) {
  const r = Math.round(size * radius);
  const i = Math.round(size * inset);
  const stroke = Math.max(1, Math.round(size * 0.04));
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect width="${size}" height="${size}" rx="${r}" fill="${WINE}"/>
      ${inset ? `<rect x="${i}" y="${i}" width="${size - 2 * i}" height="${size - 2 * i}" rx="${Math.max(0, r - i)}" fill="none" stroke="${INK}" stroke-opacity="0.35" stroke-width="${stroke}"/>` : ""}
    </svg>`);
}

async function icon(size, { scale = 0.72, radius = 0.22, inset = 0 } = {}, glyph) {
  const g = await sharp(glyph)
    .resize({
      width: Math.round(size * scale),
      height: Math.round(size * scale),
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();
  return sharp(tile(size, { radius, inset }))
    .composite([{ input: g, gravity: "center" }])
    .png()
    .toBuffer();
}

// ICO container with embedded PNGs (supported by every modern browser)
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const dir = Buffer.alloc(16 * pngs.length);
  let offset = 6 + dir.length;
  pngs.forEach(({ size, data }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });
  return Buffer.concat([header, dir, ...pngs.map((p) => p.data)]);
}

async function shareImage(word) {
  const W = 1200;
  const H = 630;

  const photo = await sharp(COVER)
    .resize(W, H, { fit: "cover", position: "centre" })
    .modulate({ brightness: 0.45 })
    .toBuffer();

  const shade = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${INK}" stop-opacity="0.2"/>
          <stop offset="0.45" stop-color="${INK}" stop-opacity="0.55"/>
          <stop offset="1" stop-color="${INK}" stop-opacity="0.96"/>
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.62" r="0.6">
          <stop offset="0" stop-color="${WINE}" stop-opacity="0.45"/>
          <stop offset="1" stop-color="${WINE}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#v)"/>
      <rect width="${W}" height="${H}" fill="url(#glow)"/>
      <rect x="0" y="${H - 8}" width="${W}" height="8" fill="${WINE}"/>
    </svg>`);

  const wordWidth = 860;
  const wordImg = await sharp(word).resize({ width: wordWidth }).toBuffer();
  const { height: wordHeight } = await sharp(wordImg).metadata();
  const wordTop = 150;

  const text = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <style>
        .t { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; letter-spacing: 9px; }
      </style>
      <text x="${W / 2}" y="${wordTop + wordHeight + 64}" text-anchor="middle" class="t" font-size="30" fill="#e46a9c">WOMEN-LED BAND · THE BEGINNING</text>
      <text x="${W / 2}" y="${wordTop + wordHeight + 110}" text-anchor="middle" class="t" font-size="22" fill="${BONE}" fill-opacity="0.75">BHAKTAPUR, NEPAL</text>
    </svg>`);

  return sharp(photo)
    .composite([
      { input: shade },
      { input: wordImg, top: wordTop, left: Math.round((W - wordWidth) / 2) },
      { input: text },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
}

const glyph = await cutout(G_REGION);
const word = await cutout(WORD_REGION);

await fs.mkdir("public/icons", { recursive: true });

const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map(async (size) => ({ size, data: await icon(size, { scale: 0.8, radius: 0.18 }, glyph) }))
);
await fs.writeFile("app/favicon.ico", ico(icoPngs));
await fs.writeFile("app/icon.png", await icon(192, { inset: 0.05 }, glyph));
// iOS rounds the corners itself, so the apple icon is a full square
await fs.writeFile("app/apple-icon.png", await icon(180, { radius: 0, scale: 0.68 }, glyph));
await fs.writeFile("public/icons/icon-192.png", await icon(192, { inset: 0.05 }, glyph));
await fs.writeFile("public/icons/icon-512.png", await icon(512, { inset: 0.05 }, glyph));
// Android crops maskable icons to a circle: full bleed, glyph inside the safe zone
await fs.writeFile("public/icons/maskable-512.png", await icon(512, { radius: 0, scale: 0.5 }, glyph));

const share = await shareImage(word);
await fs.writeFile("public/images/share.jpg", share);

console.log("Brand assets generated.");
