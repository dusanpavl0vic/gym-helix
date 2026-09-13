/**
 * Brand settings — the single source for scripts/generate-brand-assets.ts (icons, splash, favicon, banner)
 * and the in-app Logo / AnimatedSplash. Import-free so the Node script can load it directly.
 * The logo artwork itself lives in assets/brand/helix-logo.svg.
 */

export const LOGO_SOURCE_FILE = 'assets/brand/helix-logo.svg';

/** Color roles, as keys of `colors` in constants/colors.ts. */
export const BRAND_COLOR_ROLES = {
  background: 'ink',
  accent: 'restCard',
  wordmark: 'paperWarm',
  tagline: 'lime',
  monochrome: 'white',
} as const;

/** Soft accent circle behind the logo on the icon and banner (fractions of the canvas). */
export const ICON_ACCENT_CIRCLE = { cx: 0.84, cy: 0.16, r: 0.27 } as const;

export const ICON_CANVAS = 1024;

/**
 * Logo box size as a fraction of each canvas. The adaptive/splash values keep the lime ring
 * inside Android's circular safe zone (~61% of the canvas).
 */
export const LOGO_SCALE = {
  icon: 0.74,
  adaptiveForeground: 0.62,
  splash: 0.62,
  favicon: 0.86,
} as const;

/** Must match `imageWidth` of the expo-splash-screen plugin in app.json. */
export const SPLASH_IMAGE_WIDTH = 200;
/** On-screen size of the logo in the native splash, so the in-app splash starts at the same size. */
export const SPLASH_LOGO_SIZE = Math.round(SPLASH_IMAGE_WIDTH * LOGO_SCALE.splash);

export const SPLASH_TIMING = {
  enter: 300,
  hold: 700,
  fadeOut: 250,
} as const;

/** Corner radius of the rounded logo tile, as a fraction of its size. */
export const LOGO_TILE_RADIUS = 0.23;
export const LOGO_TILE_PADDING = 0.13;
