// Generate public/favicon.ico and public/apple-touch-icon.png from the
// official Vultisig brand presets in the Branding repo.
//
// Source of truth: Branding/Vultisig graphics/logos/*.png
//   - 180x180.png  -> public/apple-touch-icon.png (copied verbatim)
//   - 512x512.png  -> public/favicon.ico (downsampled to 16/32/48)
//
// Rerun manually after brand asset updates.

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = "/Users/paaaotc/Documents/Vultisig/GitHub/website-prod";
const BRAND = "/Users/paaaotc/Documents/Vultisig/GitHub/Branding/Vultisig graphics/logos";

const APPLE_SRC = path.join(BRAND, "180x180.png");
const ICO_SRC = path.join(BRAND, "512x512.png");

// --- apple-touch-icon.png: copy 180x180 brand preset verbatim ---
await fs.copyFile(APPLE_SRC, path.join(ROOT, "public/apple-touch-icon.png"));
const appleStat = await fs.stat(path.join(ROOT, "public/apple-touch-icon.png"));
console.log("wrote public/apple-touch-icon.png", appleStat.size, "bytes (brand 180x180 verbatim)");

// --- favicon.ico: multi-size (16, 32, 48) downsampled from brand 512x512 ---
const ICO_SIZES = [16, 32, 48];
const icoSrc = await fs.readFile(ICO_SRC);
const pngs = await Promise.all(
  ICO_SIZES.map((s) =>
    sharp(icoSrc)
      .resize(s, s, { fit: "contain", kernel: "lanczos3" })
      .png({ compressionLevel: 9 })
      .toBuffer(),
  ),
);

const HEADER = 6;
const ENTRY = 16;
const header = Buffer.alloc(HEADER);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type 1 = icon
header.writeUInt16LE(ICO_SIZES.length, 4); // count

const entries = Buffer.alloc(ENTRY * ICO_SIZES.length);
let offset = HEADER + ENTRY * ICO_SIZES.length;
for (let i = 0; i < ICO_SIZES.length; i++) {
  const s = ICO_SIZES[i];
  const data = pngs[i];
  const e = i * ENTRY;
  entries.writeUInt8(s === 256 ? 0 : s, e + 0);
  entries.writeUInt8(s === 256 ? 0 : s, e + 1);
  entries.writeUInt8(0, e + 2);
  entries.writeUInt8(0, e + 3);
  entries.writeUInt16LE(1, e + 4);
  entries.writeUInt16LE(32, e + 6);
  entries.writeUInt32LE(data.length, e + 8);
  entries.writeUInt32LE(offset, e + 12);
  offset += data.length;
}

const ico = Buffer.concat([header, entries, ...pngs]);
await fs.writeFile(path.join(ROOT, "public/favicon.ico"), ico);
console.log("wrote public/favicon.ico", ico.length, "bytes (brand 512x512 -> 16/32/48)");
