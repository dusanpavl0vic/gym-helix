import { colors } from '@/constants/colors';

/** Mark scale and corner radius (viewBox units) when drawn on the background tile. */
export const TILE = { markScale: 0.72, radius: 46 } as const;

export const logoColors = {
  tile: colors.forest,
  tileAccent: colors.forestLight,
  ring: colors.lime,
  dumbbell: colors.paperWarm,
} as const;
