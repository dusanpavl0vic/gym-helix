import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  row: { borderRadius: radii.xl, borderWidth: 1.5, padding: spacing.lg, gap: spacing.lg },
  idle: { backgroundColor: colors.paperWarm, borderColor: colors.border },
  current: { backgroundColor: colors.mint, borderColor: colors.lime },
  grid: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  number: { ...typography.monoS, color: colors.ink, width: 34, textAlign: 'center' },
  cell: {
    flex: 1,
    ...typography.monoInput,
    textAlign: 'center',
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    paddingVertical: 11,
    overflow: 'hidden',
  },
  inkDone: { color: colors.muted },
  ink: { color: colors.ink },
  mark: { width: metrics.setMark, height: metrics.setMark, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  markDone: { backgroundColor: colors.forest },
  markCurrent: { backgroundColor: colors.lime },
  markText: { ...typography.bodyStrong },
  markTextDone: { color: colors.paperWarm },
  markTextCurrent: { color: colors.ink },
  steppers: { flexDirection: 'row', gap: spacing.lg },
  rirValue: { ...typography.monoTag, color: colors.muted, textAlign: 'center' },
});
