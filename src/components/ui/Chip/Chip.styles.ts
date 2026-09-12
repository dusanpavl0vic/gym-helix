import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  base: { borderRadius: radii.pill, paddingVertical: 7, paddingHorizontal: spacing.lg, alignSelf: 'flex-start' },
});

export const variantStyles = StyleSheet.create({
  mint: { backgroundColor: colors.mint },
  onDark: { backgroundColor: colors.chipOnDark },
  lime: { backgroundColor: colors.lime },
  outline: { backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.border },
});

export const labelStyles = StyleSheet.create({
  mint: { ...typography.chip, color: colors.forest },
  onDark: { ...typography.chip, color: colors.mint },
  lime: { ...typography.monoTag, color: colors.ink },
  outline: { ...typography.chip, color: colors.slate },
});
