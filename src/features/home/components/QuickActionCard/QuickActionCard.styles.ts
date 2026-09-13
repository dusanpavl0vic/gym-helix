import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const QUICK_CARD_MIN_HEIGHT = 118;

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xxl,
    padding: spacing.xxl,
    gap: spacing.sm,
    minHeight: QUICK_CARD_MIN_HEIGHT,
  },
  pressed: { borderColor: colors.forest },
  iconTile: { width: metrics.iconTile, height: metrics.iconTile, borderRadius: radii.md, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center' },
  title: { ...typography.bodyStrong, color: colors.ink },
  hint: { ...typography.small, color: colors.muted },
});
