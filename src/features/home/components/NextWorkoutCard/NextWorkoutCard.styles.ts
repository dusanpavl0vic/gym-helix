import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  card: { backgroundColor: colors.forest, borderRadius: radii.hero, padding: spacing.x6, gap: spacing.x3, overflow: 'hidden' },
  circle: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: metrics.heroCircle,
    height: metrics.heroCircle,
    borderRadius: metrics.heroCircle / 2,
    backgroundColor: colors.forestLight,
  },
  texts: { gap: spacing.xs },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flexWrap: 'wrap' },
  eyebrow: { ...typography.monoTag, color: colors.lime },
  title: { ...typography.hero, color: colors.paperWarm },
  meta: { ...typography.body, color: colors.sage },
  footnote: { ...typography.monoTag, color: colors.sage, marginTop: spacing.xs },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  actions: { gap: spacing.md },
  secondary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, minHeight: 36 },
  secondaryText: { ...typography.captionSemibold, color: colors.mint },
});
