import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  item: {
    flex: 1,
    minHeight: metrics.tabItemHeight,
    borderRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxs,
  },
  focused: { backgroundColor: colors.mint },
  label: { ...typography.tabLabel, color: colors.mutedLight },
  labelFocused: { color: colors.forest },
});
