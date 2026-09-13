/**
 * Logo geometry — the single source for the app icon, splash, favicon (scripts/generate-brand-assets.ts)
 * and the in-app Logo / AnimatedSplash components. Kept import-free so the Node script can load it directly.
 *
 * The mark is a "G" drawn as the rest-timer ring with a dumbbell as its crossbar,
 * in a 200×200 viewBox centered at 0,0 (outer ring radius = 100).
 */

export const LOGO_VIEWBOX_SIZE = 200;
export const LOGO_VIEWBOX = `${-LOGO_VIEWBOX_SIZE / 2} ${-LOGO_VIEWBOX_SIZE / 2} ${LOGO_VIEWBOX_SIZE} ${LOGO_VIEWBOX_SIZE}`;

const RING_RADIUS = 86;
const RING_STROKE = 28;
/** The ring starts at 3 o'clock (where the crossbar joins) and runs clockwise to the upper-right terminal. */
const RING_END_DEG = -40;
const RING_SWEEP_DEG = 360 + RING_END_DEG;

const round = (value: number) => Math.round(value * 100) / 100;
const pointAt = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: round(RING_RADIUS * Math.cos(rad)), y: round(RING_RADIUS * Math.sin(rad)) };
};

const ringStart = pointAt(0);
const ringEnd = pointAt(RING_END_DEG);

export const LOGO_RING = {
  radius: RING_RADIUS,
  stroke: RING_STROKE,
  path: `M ${ringStart.x} ${ringStart.y} A ${RING_RADIUS} ${RING_RADIUS} 0 1 1 ${ringEnd.x} ${ringEnd.y}`,
  length: round((RING_SWEEP_DEG / 360) * 2 * Math.PI * RING_RADIUS),
} as const;

export interface LogoRect {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
}

/** Bar first (it tucks under the ring), then plates from left to right. */
export const LOGO_DUMBBELL: LogoRect[] = [
  { x: -10, y: -7, width: 90, height: 14, rx: 7 },
  { x: -28, y: -36, width: 16, height: 72, rx: 6 },
  { x: -10, y: -25, width: 10, height: 50, rx: 4 },
  { x: 28, y: -25, width: 10, height: 50, rx: 4 },
  { x: 40, y: -36, width: 16, height: 72, rx: 6 },
];

/** Color roles, as keys of `colors` in constants/colors.ts. */
export const BRAND_COLOR_ROLES = {
  background: 'forest',
  accent: 'forestLight',
  ring: 'lime',
  dumbbell: 'paperWarm',
  wordmark: 'paperWarm',
  tagline: 'lime',
} as const;

/** Soft accent circle behind the mark (fractions of the icon size), echoing the hero card on the Home screen. */
export const ICON_ACCENT_CIRCLE = { cx: 0.84, cy: 0.16, r: 0.27 } as const;

/** Mark scale per asset (outer ring radius in px on a 1024 canvas = scale × 100). */
export const ICON_CANVAS = 1024;
export const MARK_SCALE = {
  icon: 3.3,
  adaptiveForeground: 2.85,
  splash: 3,
  favicon: 0.19,
} as const;

/** Must match `imageWidth` of the expo-splash-screen plugin in app.json. */
export const SPLASH_IMAGE_WIDTH = 200;
/** On-screen size of the mark in the native splash, so the animated splash starts at the same size. */
export const SPLASH_LOGO_SIZE = round((SPLASH_IMAGE_WIDTH * MARK_SCALE.splash * LOGO_VIEWBOX_SIZE) / ICON_CANVAS);

export const SPLASH_TIMING = {
  ringDraw: 550,
  dumbbellDelay: 180,
  textDelay: 250,
  hold: 750,
  fadeOut: 250,
} as const;
