import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', backgroundColor: colors.track, borderRadius: radii.xl, padding: spacing.xs, gap: spacing.xs },
  item: {
    flex: 1,
    minHeight: metrics.tapTarget,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  selected: { backgroundColor: colors.paper },
  label: { ...typography.bodyStrong, fontSize: 13, lineHeight: 17, color: colors.muted, textAlign: 'center' },
  labelSelected: { color: colors.forest },
});
