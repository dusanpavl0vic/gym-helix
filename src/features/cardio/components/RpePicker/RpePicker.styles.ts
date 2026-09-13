import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  label: { ...typography.monoMicro, color: colors.muted },
  hint: { ...typography.small, color: colors.muted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  value: {
    width: '18%',
    flexGrow: 1,
    minHeight: metrics.tapTarget,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paperWarm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: { backgroundColor: colors.forest, borderColor: colors.forest },
  text: { ...typography.monoS, color: colors.slate },
  textSelected: { color: colors.paperWarm },
});
