import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: radii.xxl, padding: spacing.lg },
  main: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.xl },
  badge: { width: metrics.historyBadge, height: metrics.historyBadge, borderRadius: radii.md, backgroundColor: colors.forest, alignItems: 'center', justifyContent: 'center' },
  badgeText: { ...typography.monoXS, color: colors.lime },
  texts: { flex: 1, gap: 3 },
  name: { ...typography.bodyStrong, color: colors.ink },
  meta: { ...typography.caption, color: colors.muted },
  controls: { flexDirection: 'row', gap: spacing.xs },
});
