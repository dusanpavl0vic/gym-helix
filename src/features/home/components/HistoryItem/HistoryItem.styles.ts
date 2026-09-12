import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xxl,
    padding: spacing.xxl,
  },
  pressed: { borderColor: colors.forest },
  badge: {
    width: metrics.historyBadge,
    height: metrics.historyBadge,
    borderRadius: radii.md,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { ...typography.monoXS, color: colors.forest },
  texts: { flex: 1, gap: 3, minWidth: 0 },
  title: { ...typography.bodyStrong, color: colors.ink },
  meta: { ...typography.caption, color: colors.muted },
  value: { ...typography.monoXS, color: colors.forest },
});
