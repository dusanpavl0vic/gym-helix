import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  box: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: radii.x3, padding: spacing.x3, gap: spacing.x3 },
  title: { ...typography.h3, color: colors.ink },
  label: { ...typography.monoMicro, color: colors.muted },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { minHeight: 40, paddingHorizontal: spacing.xl, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.paperWarm, justifyContent: 'center' },
  chipOn: { backgroundColor: colors.forest, borderColor: colors.forest },
  chipText: { ...typography.chip, fontSize: 12, color: colors.slate },
  chipTextOn: { color: colors.paperWarm },
  error: { ...typography.caption, color: colors.danger },
  row: { flexDirection: 'row', gap: spacing.lg },
});
