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

export const typography = {
  hero: t(fontFamily.extrabold, 28, 30, { letterSpacing: -0.6 }),
  h1: t(fontFamily.extrabold, 26, 29, { letterSpacing: -0.5 }),
  h2: t(fontFamily.extrabold, 24, 27, { letterSpacing: -0.4 }),
  h3: t(fontFamily.extrabold, 16, 20),
  title: t(fontFamily.bold, 15, 18),
  bodyStrong: t(fontFamily.bold, 14, 17),
  body: t(fontFamily.medium, 13, 18),
  bodySemibold: t(fontFamily.semibold, 13, 17),
  caption: t(fontFamily.medium, 12, 15),
  captionSemibold: t(fontFamily.semibold, 12, 15),
  small: t(fontFamily.medium, 11, 14),
  chip: t(fontFamily.semibold, 11, 13),
  tabLabel: t(fontFamily.bold, 11, 13),
  label: t(fontFamily.semibold, 10, 13, { textTransform: 'uppercase', letterSpacing: 0.4 }),
  button: t(fontFamily.extrabold, 16, 20),
  buttonLarge: t(fontFamily.extrabold, 17, 21),
  buttonSecondary: t(fontFamily.bold, 14, 18),
  monoXL: t(fontFamily.monoBold, 54, 60),
  monoL: t(fontFamily.monoBold, 22, 26),
  monoM: t(fontFamily.monoBold, 20, 24),
  monoInput: t(fontFamily.monoBold, 16, 20),
  monoS: t(fontFamily.monoBold, 13, 16),
  monoXS: t(fontFamily.monoBold, 12, 15),
  monoTag: t(fontFamily.monoBold, 11, 14),
  monoMicro: t(fontFamily.monoBold, 10, 13),
  monoEyebrow: t(fontFamily.mono, 12, 15),
} as const;

export type TypographyVariant = keyof typeof typography;
