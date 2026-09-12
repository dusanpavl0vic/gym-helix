import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  label: { ...typography.monoMicro, color: colors.muted },
  input: {
    ...typography.bodySemibold,
    fontSize: 15,
    color: colors.ink,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    minHeight: metrics.buttonHeight,
    paddingHorizontal: spacing.xxl,
  },
  multiline: { minHeight: 96, paddingTop: spacing.xl, textAlignVertical: 'top' },
});
