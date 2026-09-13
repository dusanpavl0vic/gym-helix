import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

import { QUICK_CARD_MIN_HEIGHT } from '../QuickActionCard/QuickActionCard.styles';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xxl,
    padding: spacing.xxl,
    gap: spacing.xs,
    minHeight: QUICK_CARD_MIN_HEIGHT,
  },
  pressed: { borderColor: colors.forest },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconTile: { width: metrics.iconTile, height: metrics.iconTile, borderRadius: radii.md, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center' },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.xs },
  value: { ...typography.monoL, color: colors.ink },
  unit: { ...typography.monoTag, color: colors.muted },
  add: { ...typography.bodyStrong, color: colors.forest },
  caption: { ...typography.small, color: colors.muted },
  delta: { ...typography.monoTag, color: colors.forest },
});
