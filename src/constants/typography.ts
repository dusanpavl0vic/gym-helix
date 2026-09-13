import type { TextStyle } from 'react-native';

export const fontFamily = {
  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  semibold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
  extrabold: 'Manrope_800ExtraBold',
  mono: 'SpaceMono_400Regular',
  monoBold: 'SpaceMono_700Bold',
} as const;

const t = (family: string, fontSize: number, lineHeight: number, extra: TextStyle = {}): TextStyle => ({
  fontFamily: family,
  fontSize,
  lineHeight,
  ...extra,
});

/** Line heights are ≥1.25× (Manrope) and ≥1.35× (Space Mono) so Android never clips glyphs. */
export const typography = {
  hero: t(fontFamily.extrabold, 28, 36, { letterSpacing: -0.6 }),
  h1: t(fontFamily.extrabold, 26, 33, { letterSpacing: -0.5 }),
  h2: t(fontFamily.extrabold, 22, 29, { letterSpacing: -0.4 }),
  h3: t(fontFamily.extrabold, 16, 21),
  title: t(fontFamily.bold, 15, 20),
  bodyStrong: t(fontFamily.bold, 14, 19),
  body: t(fontFamily.medium, 13, 18),
  bodySemibold: t(fontFamily.semibold, 13, 18),
  caption: t(fontFamily.medium, 12, 16),
  captionSemibold: t(fontFamily.semibold, 12, 16),
  small: t(fontFamily.medium, 11, 15),
  chip: t(fontFamily.semibold, 11, 15),
  tabLabel: t(fontFamily.bold, 11, 15),
  label: t(fontFamily.semibold, 10, 14, { textTransform: 'uppercase', letterSpacing: 0.4 }),
  button: t(fontFamily.extrabold, 16, 21),
  buttonLarge: t(fontFamily.extrabold, 17, 22),
  buttonSecondary: t(fontFamily.bold, 14, 19),
  monoXL: t(fontFamily.monoBold, 54, 72),
  monoDisplay: t(fontFamily.monoBold, 40, 54),
  monoValue: t(fontFamily.monoBold, 28, 38),
  monoL: t(fontFamily.monoBold, 22, 30),
  monoM: t(fontFamily.monoBold, 20, 27),
  monoInput: t(fontFamily.monoBold, 16, 22),
  monoS: t(fontFamily.monoBold, 13, 18),
  monoXS: t(fontFamily.monoBold, 12, 17),
  monoTag: t(fontFamily.monoBold, 11, 15),
  monoMicro: t(fontFamily.monoBold, 10, 14),
  monoEyebrow: t(fontFamily.mono, 12, 17),
} as const;

export type TypographyVariant = keyof typeof typography;
