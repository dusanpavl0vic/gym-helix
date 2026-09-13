import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

const DAY_BOX = 38;
const DOT = 5;

export const styles = StyleSheet.create({
  card: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: radii.x4, padding: spacing.x3, gap: spacing.xl },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  month: { ...typography.h3, color: colors.ink, textTransform: 'capitalize' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, alignItems: 'center', justifyContent: 'center', paddingVertical: 3 },
  weekday: { ...typography.monoMicro, color: colors.muted },
  dayBox: { width: DAY_BOX, height: DAY_BOX, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center', gap: 2 },
  daySelected: { backgroundColor: colors.mint },
  today: { borderWidth: 1, borderColor: colors.forest },
  dayText: { ...typography.monoXS, color: colors.ink },
  dots: { flexDirection: 'row', gap: 2, height: DOT },
  dot: { width: DOT, height: DOT, borderRadius: DOT / 2 },
  strength: { backgroundColor: colors.forest },
  cardio: { backgroundColor: colors.lime },
  legend: { flexDirection: 'row', gap: spacing.x4, justifyContent: 'center' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  legendText: { ...typography.small, color: colors.muted },
});
