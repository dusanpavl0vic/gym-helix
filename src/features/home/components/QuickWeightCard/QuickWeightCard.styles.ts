import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xxl,
    padding: spacing.xxl,
    gap: spacing.sm,
    minHeight: 92,
  },
  title: { ...typography.bodyStrong, color: colors.ink },
  saved: { ...typography.monoTag, color: colors.forest },
  row: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  input: { flex: 1 },
  save: {
    width: metrics.tapTarget,
    height: metrics.tapTarget,
    borderRadius: radii.md,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: { ...typography.bodyStrong, color: colors.paperWarm },
});
