import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const iconsDir = join(root, 'public', 'icons');
const splashDir = join(root, 'public', 'splash');

mkdirSync(iconsDir, { recursive: true });
mkdirSync(splashDir, { recursive: true });

const crcTable = new Uint32Array(256).map((_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  return value >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function png(width, height, paint) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x += 1) {
      const [r, g, b, a] = paint(x, y, width, height);
      const index = row + 1 + x * 4;
      raw[index] = r;
      raw[index + 1] = g;
      raw[index + 2] = b;
      raw[index + 3] = a;
    }
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function mix(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function roundedRectAlpha(x, y, width, height, radius) {
  const left = radius;
  const right = width - radius - 1;
  const top = radius;
  const bottom = height - radius - 1;
  const cx = x < left ? left : x > right ? right : x;
  const cy = y < top ? top : y > bottom ? bottom : y;
  const distance = Math.hypot(x - cx, y - cy);
  return distance <= radius ? 255 : 0;
}

function iconPaint(maskable = false) {
  return (x, y, width, height) => {
    const t = (x + y) / (width + height);
    const bg = [mix(246, 226, t), mix(242, 250, t), mix(234, 239, t)];
    const safe = maskable ? 0 : Math.round(width * 0.08);
    if (!maskable && roundedRectAlpha(x - safe, y - safe, width - safe * 2, height - safe * 2, width * 0.22) === 0) {
      return [0, 0, 0, 0];
    }

    const cx = width * 0.5;
    const cy = height * 0.5;
    const dx = x - cx;
    const dy = y - cy;
    const radius = width * 0.34;
    let r = bg[0];
    let g = bg[1];
    let b = bg[2];

    if (Math.hypot(dx, dy) < radius) {
      r = 43;
      g = 191;
      b = 138;
    }

    const stem = Math.abs(dx + dy * 0.18) < width * 0.035 && y > height * 0.25 && y < height * 0.76;
    const leftLeaf = Math.pow((x - width * 0.42) / (width * 0.16), 2) + Math.pow((y - height * 0.43) / (height * 0.1), 2) < 1;
    const rightLeaf = Math.pow((x - width * 0.6) / (width * 0.19), 2) + Math.pow((y - height * 0.52) / (height * 0.12), 2) < 1;
    const sun = Math.hypot(x - width * 0.64, y - height * 0.32) < width * 0.075;

    if (stem || leftLeaf || rightLeaf) {
      r = 22;
      g = 33;
      b = 31;
    }
    if (sun) {
      r = 245;
      g = 185;
      b = 66;
    }

    return [r, g, b, 255];
  };
}

function splashPaint(width, height) {
  const iconSize = Math.round(Math.min(width, height) * 0.25);
  const iconBuffer = png(iconSize, iconSize, iconPaint(false));
  return (x, y) => {
    const t = y / height;
    let r = mix(246, 235, t);
    let g = mix(242, 249, t);
    let b = mix(234, 239, t);
    const centerGlow = Math.max(0, 1 - Math.hypot(x - width * 0.5, y - height * 0.42) / (width * 0.62));
    r = mix(r, 43, centerGlow * 0.08);
    g = mix(g, 191, centerGlow * 0.08);
    b = mix(b, 138, centerGlow * 0.08);

    const ix = Math.round((width - iconSize) / 2);
    const iy = Math.round(height * 0.34);
    if (x >= ix && x < ix + iconSize && y >= iy && y < iy + iconSize) {
      const source = inflateIconCache.get(iconBuffer) ?? iconPaint(false)(x - ix, y - iy, iconSize, iconSize);
      if (source[3] > 0) return source;
    }

    const wordTop = Math.round(height * 0.62);
    if (y > wordTop && y < wordTop + Math.max(12, height * 0.018) && x > width * 0.28 && x < width * 0.72) {
      return [22, 33, 31, 255];
    }

    return [r, g, b, 255];
  };
}

const inflateIconCache = new Map();

for (const size of [72, 96, 128, 144, 152, 180, 192, 384, 512]) {
  writeFileSync(join(iconsDir, `icon-${size}.png`), png(size, size, iconPaint(false)));
}

for (const size of [192, 512]) {
  writeFileSync(join(iconsDir, `maskable-icon-${size}.png`), png(size, size, iconPaint(true)));
}

for (const [width, height] of [
  [828, 1792],
  [1125, 2436],
  [1170, 2532],
  [1242, 2688],
  [1290, 2796],
  [2048, 2732],
]) {
  writeFileSync(join(splashDir, `splash-${width}x${height}.png`), png(width, height, splashPaint(width, height)));
}

console.log('Generated Momentum PWA icons and splash screens.');
