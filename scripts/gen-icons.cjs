const sharp = require('sharp');
const fs = require('fs');

// App logo: paper-plane path in a 24x24 viewBox (from the in-app logo)
const plane = 'M12 2 L20 19 C21 21 19 23 17 22 L13 20 C12 20 12 20 11 20 L7 22 C5 23 3 21 4 19 Z';

// Emerald rounded square + white plane, centered. size = canvas size.
function mark(size, sq = 0.547, planeScale = 0.30) {
  const sqSize = size * sq;
  const sqXY = (size - sqSize) / 2;
  const rx = sqSize * 0.23;
  const k = (size * planeScale) / 24;
  const pSize = 24 * k;
  const tx = (size - pSize) / 2;
  const ty = (size - pSize) / 2;
  return `
    <defs>
      <linearGradient id="em" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#10B981"/>
        <stop offset="1" stop-color="#059669"/>
      </linearGradient>
    </defs>
    <rect x="${sqXY}" y="${sqXY}" width="${sqSize}" height="${sqSize}" rx="${rx}" fill="url(#em)"/>
    <g transform="translate(${tx},${ty}) scale(${k})"><path d="${plane}" fill="white"/></g>
  `;
}

function svg(size, bg, inner) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${bg}${inner}</svg>`);
}

const navy = (s) => `<rect width="${s}" height="${s}" fill="#0A2540"/>`;

async function png(buf, w, h, out) {
  await sharp(buf, { density: 384 }).resize(w, h).png().toFile(out);
  console.log('wrote', out);
}

(async () => {
  // Full icon (navy bg + mark) — legacy / iOS / web
  await png(svg(1024, navy(1024), mark(1024)), 1024, 1024, 'assets/icon-only.png');
  // Adaptive background (solid navy)
  await png(svg(1024, navy(1024), ''), 1024, 1024, 'assets/icon-background.png');
  // Adaptive foreground (transparent + mark, smaller for safe zone)
  await png(svg(1024, '', mark(1024, 0.42, 0.23)), 1024, 1024, 'assets/icon-foreground.png');
  // Splash (navy + centered mark)
  await png(svg(2732, navy(2732), mark(2732, 0.22, 0.12)), 2732, 2732, 'assets/splash.png');
  await png(svg(2732, navy(2732), mark(2732, 0.22, 0.12)), 2732, 2732, 'assets/splash-dark.png');
})();
