import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const TOOLTIP_WIDTH = 116;

export const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    top: 0,
    width: TOOLTIP_WIDTH,
    backgroundColor: colors.ink,
    borderRadius: radii.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    gap: spacing.xxs,
  },
  value: { ...typography.monoS, color: colors.paperWarm },
  label: { ...typography.small, color: colors.sage },
});
