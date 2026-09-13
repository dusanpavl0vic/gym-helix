/**
 * Renders the logo into every icon/splash/favicon asset used by app.json, plus README branding.
 *
 * Run: npm run generate:brand
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Resvg } from '@resvg/resvg-js';

import {
  BRAND_COLOR_ROLES, ICON_ACCENT_CIRCLE, ICON_CANVAS, LOGO_DUMBBELL, LOGO_RING, MARK_SCALE,
} from '../src/constants/brand.ts';
import { colors } from '../src/constants/colors.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const images = join(root, 'assets', 'images');
const brandDir = join(root, 'assets', 'brand');
const fontFiles = [
  join(root, 'node_modules/@expo-google-fonts/manrope/800ExtraBold/Manrope_800ExtraBold.ttf'),
  join(root, 'node_modules/@expo-google-fonts/space-mono/700Bold/SpaceMono_700Bold.ttf'),
];

const role = (key: keyof typeof BRAND_COLOR_ROLES) => colors[BRAND_COLOR_ROLES[key]];

interface MarkOptions {
  cx: number;
  cy: number;
  scale: number;
  mono?: string;
}

function mark({ cx, cy, scale, mono }: MarkOptions): string {
  const dumbbellFill = mono ?? role('dumbbell');
  const ringStroke = mono ?? role('ring');
  const rects = LOGO_DUMBBELL.map(
    (r) => `<rect x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" rx="${r.rx}" fill="${dumbbellFill}"/>`,
  ).join('');
  const ring = `<path d="${LOGO_RING.path}" fill="none" stroke="${ringStroke}" stroke-width="${LOGO_RING.stroke}" stroke-linecap="round"/>`;
  return `<g transform="translate(${cx} ${cy}) scale(${scale})">${rects}${ring}</g>`;
}

const svg = (width: number, height: number, body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`;

const background = (size: number, radius = 0) =>
  `<rect width="${size}" height="${size}" rx="${radius}" fill="${role('background')}"/>` +
  `<circle cx="${size * ICON_ACCENT_CIRCLE.cx}" cy="${size * ICON_ACCENT_CIRCLE.cy}" r="${size * ICON_ACCENT_CIRCLE.r}" fill="${role('accent')}"/>`;

function writePng(path: string, markup: string, width?: number) {
  const renderer = new Resvg(markup, {
    fitTo: width ? { mode: 'width', value: width } : { mode: 'original' },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Manrope' },
  });
  writeFileSync(path, renderer.render().asPng());
  console.log(`✓ ${path.replace(`${root}/`, '')}`);
}

function main() {
  mkdirSync(brandDir, { recursive: true });
  const size = ICON_CANVAS;
  const center = size / 2;

  const icon = svg(size, size, background(size) + mark({ cx: center, cy: center, scale: MARK_SCALE.icon }));
  writePng(join(images, 'icon.png'), icon);
  writeFileSync(join(brandDir, 'logo.svg'), icon);

  writePng(join(images, 'android-icon-foreground.png'), svg(size, size, mark({ cx: center, cy: center, scale: MARK_SCALE.adaptiveForeground })));
  writePng(join(images, 'android-icon-background.png'), svg(size, size, background(size)));
  writePng(
    join(images, 'android-icon-monochrome.png'),
    svg(size, size, mark({ cx: center, cy: center, scale: MARK_SCALE.adaptiveForeground, mono: colors.white })),
  );

  const splash = svg(size, size, mark({ cx: center, cy: center, scale: MARK_SCALE.splash }));
  writePng(join(images, 'splash-icon.png'), splash);
  writeFileSync(join(brandDir, 'logo-mark.svg'), svg(size, size, mark({ cx: center, cy: center, scale: MARK_SCALE.icon })));

  const faviconSize = 48;
  writePng(
    join(images, 'favicon.png'),
    svg(faviconSize, faviconSize, `<rect width="${faviconSize}" height="${faviconSize}" rx="11" fill="${role('background')}"/>` +
      mark({ cx: faviconSize / 2, cy: faviconSize / 2, scale: MARK_SCALE.favicon })),
  );

  const bannerW = 1600;
  const bannerH = 440;
  const banner = svg(
    bannerW,
    bannerH,
    `<rect width="${bannerW}" height="${bannerH}" rx="64" fill="${role('background')}"/>` +
      `<circle cx="${bannerW - 120}" cy="60" r="220" fill="${role('accent')}"/>` +
      mark({ cx: 250, cy: bannerH / 2, scale: 1.45 }) +
      `<text x="450" y="235" font-family="Manrope" font-weight="800" font-size="138" letter-spacing="-4" fill="${role('wordmark')}">GymPersonal</text>` +
      `<text x="456" y="315" font-family="Space Mono" font-weight="700" font-size="40" letter-spacing="4" fill="${role('tagline')}">TRENING PLANER · OFFLINE</text>`,
  );
  writePng(join(brandDir, 'wordmark.png'), banner);
  writeFileSync(join(brandDir, 'wordmark.svg'), banner);
}

main();
