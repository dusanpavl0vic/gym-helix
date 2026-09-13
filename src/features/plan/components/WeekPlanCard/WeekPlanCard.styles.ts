import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

const DAY_WIDTH = 40;

export const styles = StyleSheet.create({
  card: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: radii.x3, padding: spacing.x3, gap: spacing.md },
  title: { ...typography.h3, color: colors.ink },
  hint: { ...typography.small, color: colors.muted },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.md },
  rowHighlight: { backgroundColor: colors.mint },
  day: { ...typography.monoTag, color: colors.slate, width: DAY_WIDTH, textTransform: 'uppercase' },
  dayTitle: { ...typography.bodyStrong, color: colors.ink, flex: 1 },
  dayTitleMuted: { ...typography.caption, color: colors.muted },
  tempo: { ...typography.small, color: colors.slate, marginTop: spacing.xs },
});
