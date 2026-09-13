import { StyleSheet } from 'react-native';

import type { ColorName } from '@/constants/colors';
import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

import type { ButtonVariant } from './Button.types';

export const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.xl,
    paddingHorizontal: spacing.x4,
    minHeight: metrics.buttonHeight,
  },
  lg: { minHeight: metrics.primaryButtonHeight, borderRadius: radii.xxl },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  pressed: { opacity: 0.85 },
});

export const variantStyles = StyleSheet.create({
  primary: { backgroundColor: colors.forest },
  lime: { backgroundColor: colors.lime },
  dark: { backgroundColor: colors.ink },
  outline: { backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.borderStrong },
  outlineDark: { backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.forest },
  ghost: { backgroundColor: colors.transparent, minHeight: metrics.tapTarget },
  danger: { backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.danger },
  dangerSolid: { backgroundColor: colors.danger },
});

export const LABEL_COLORS: Record<ButtonVariant, ColorName> = {
  primary: 'paperWarm',
  lime: 'ink',
  dark: 'paperWarm',
  outline: 'forest',
  outlineDark: 'mint',
  ghost: 'forest',
  danger: 'danger',
  dangerSolid: 'paperWarm',
};

export const labelStyles = StyleSheet.create({
  primary: { ...typography.button, fontSize: 15, color: colors[LABEL_COLORS.primary] },
  lime: { ...typography.button, color: colors[LABEL_COLORS.lime] },
  dark: { ...typography.buttonLarge, color: colors[LABEL_COLORS.dark] },
  outline: { ...typography.buttonSecondary, color: colors[LABEL_COLORS.outline] },
  outlineDark: { ...typography.buttonSecondary, color: colors[LABEL_COLORS.outlineDark] },
  ghost: { ...typography.captionSemibold, fontSize: 14, lineHeight: 19, color: colors[LABEL_COLORS.ghost] },
  danger: { ...typography.buttonSecondary, color: colors[LABEL_COLORS.danger] },
  dangerSolid: { ...typography.buttonSecondary, color: colors[LABEL_COLORS.dangerSolid] },
});
