import type { ColorName } from '@/constants/colors';

export interface LogoProps {
  size: number;
  /** Draws the rounded forest tile behind the mark (use on light surfaces). */
  withBackground?: boolean;
  /** Single-color mark, e.g. for small monochrome placements. */
  monoColor?: ColorName;
}
