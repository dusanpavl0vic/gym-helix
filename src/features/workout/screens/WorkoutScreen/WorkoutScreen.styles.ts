import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  content: { paddingTop: spacing.xs, paddingHorizontal: spacing.screen, paddingBottom: spacing.x7, gap: spacing.xxl },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  titles: { flex: 1, gap: spacing.xs },
  name: { ...typography.h2, color: colors.ink },
  scheme: { ...typography.body, color: colors.muted },
  note: { ...typography.captionSemibold, color: colors.slate },
  substituted: { ...typography.monoTag, color: colors.forest },
  skipped: { ...typography.monoXS, color: colors.danger },
  footer: { paddingTop: spacing.xl, paddingHorizontal: spacing.screen, backgroundColor: colors.cream, borderTopWidth: 1, borderTopColor: colors.border },
  primary: { minHeight: metrics.primaryButtonHeight },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.screen, gap: spacing.x3 },
});
