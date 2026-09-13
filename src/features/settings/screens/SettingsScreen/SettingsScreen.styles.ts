import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  group: { gap: spacing.xl },
  grid: { flexDirection: 'row', gap: spacing.lg },
  hint: { ...typography.small, color: colors.muted },
  warning: { ...typography.small, color: colors.danger },
  plates: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  plate: { minWidth: 56, minHeight: 44, paddingHorizontal: spacing.lg, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.paperWarm, alignItems: 'center', justifyContent: 'center' },
  plateOn: { backgroundColor: colors.forest, borderColor: colors.forest },
  plateText: { ...typography.monoS, color: colors.slate },
  plateTextOn: { color: colors.paperWarm },
  label: { ...typography.monoMicro, color: colors.muted },
});
