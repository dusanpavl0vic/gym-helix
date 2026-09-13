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
    minHeight: metrics.buttonHeight,
    paddingHorizontal: spacing.xxl,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.paper,
  },
  selected: { borderColor: colors.forest, backgroundColor: colors.mint },
  label: { ...typography.bodyStrong, color: colors.ink, flex: 1 },
  labelDone: { color: colors.muted },
  value: { ...typography.monoS, fontSize: 15, lineHeight: 20, color: colors.ink },
  valueDone: { color: colors.muted },
});
