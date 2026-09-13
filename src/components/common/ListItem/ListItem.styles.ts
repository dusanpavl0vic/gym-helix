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
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xxl,
    minHeight: 64,
  },
  pressed: { borderColor: colors.forest },
  iconTile: {
    width: metrics.iconTile,
    height: metrics.iconTile,
    borderRadius: radii.md,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: { flex: 1, gap: 2, minWidth: 0 },
  title: { ...typography.bodyStrong, color: colors.ink },
  subtitle: { ...typography.caption, color: colors.muted },
});
