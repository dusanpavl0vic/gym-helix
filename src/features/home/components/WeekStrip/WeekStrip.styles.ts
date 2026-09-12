import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md },
  day: {
    flex: 1,
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.paper,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  today: { borderColor: colors.forest },
  label: { ...typography.monoMicro, color: colors.muted },
  dot: { width: metrics.weekDot, height: metrics.weekDot, borderRadius: metrics.weekDot / 2 },
});

export const dotColors = {
  strength: colors.forest,
  cardio: colors.lime,
  none: colors.track,
} as const;
