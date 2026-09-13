import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  box: { backgroundColor: colors.mint, borderRadius: radii.xxl, paddingHorizontal: spacing.x3, paddingVertical: spacing.sm, gap: spacing.md },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: metrics.tapTarget },
  title: { ...typography.monoTag, color: colors.forest },
  chevronOpen: { transform: [{ rotate: '180deg' }] },
  steps: { gap: spacing.md, paddingBottom: spacing.md },
  step: { flexDirection: 'row', gap: spacing.md },
  index: { ...typography.monoTag, color: colors.forest, width: 16 },
  text: { ...typography.body, color: colors.ink, flex: 1 },
});
