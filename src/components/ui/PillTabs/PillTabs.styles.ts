import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  row: { gap: spacing.md, paddingBottom: spacing.xxs },
  pill: {
    minHeight: metrics.tapTarget,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.xxl,
    justifyContent: 'center',
  },
  pillSm: { paddingHorizontal: 13 },
  selected: { backgroundColor: colors.forest, borderColor: colors.forest },
  idle: { backgroundColor: colors.paper, borderColor: colors.border },
  label: { ...typography.bodyStrong, fontSize: 13 },
  labelSm: { fontSize: 12 },
  labelSelected: { color: colors.paperWarm },
  labelIdle: { color: colors.slate },
});
