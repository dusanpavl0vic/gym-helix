import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  card: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: radii.x4, padding: spacing.x3, gap: spacing.xl },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  month: { ...typography.h3, color: colors.ink, textTransform: 'capitalize' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  weekday: { ...typography.monoMicro, color: colors.muted },
  dayBox: { width: 36, height: 36, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center', gap: 2 },
  daySelected: { backgroundColor: colors.mint },
  today: { borderWidth: 1, borderColor: colors.forest },
  dayText: { ...typography.monoXS, color: colors.ink },
  dots: { flexDirection: 'row', gap: 2, height: 5 },
  dot: { width: 5, height: 5, borderRadius: 3 },
  strength: { backgroundColor: colors.forest },
  cardio: { backgroundColor: colors.lime },
});
