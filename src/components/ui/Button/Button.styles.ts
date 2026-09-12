import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.xl,
    paddingHorizontal: spacing.x4,
    minHeight: metrics.buttonHeight,
  },
  lg: { minHeight: metrics.primaryButtonHeight, borderRadius: radii.xxl },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.45 },
});

export const variantStyles = StyleSheet.create({
  primary: { backgroundColor: colors.forest },
  lime: { backgroundColor: colors.lime },
  dark: { backgroundColor: colors.ink },
  outline: { backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.borderStrong, minHeight: 48 },
  outlineDark: { backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.forest },
  ghost: { backgroundColor: colors.transparent, minHeight: metrics.tapTarget },
  danger: { backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.danger, minHeight: 48 },
});

export const labelStyles = StyleSheet.create({
  primary: { ...typography.button, fontSize: 15, color: colors.paperWarm },
  lime: { ...typography.button, color: colors.ink },
  dark: { ...typography.buttonLarge, color: colors.paperWarm },
  outline: { ...typography.buttonSecondary, color: colors.forest },
  outlineDark: { ...typography.buttonSecondary, color: colors.mint },
  ghost: { ...typography.captionSemibold, color: colors.forest },
  danger: { ...typography.buttonSecondary, color: colors.danger },
});
