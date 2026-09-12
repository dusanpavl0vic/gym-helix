import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  card: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: radii.x3, padding: spacing.xxl, gap: spacing.xl },
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  name: { ...typography.title, color: colors.ink, flex: 1 },
  controls: { flexDirection: 'row', gap: spacing.xs },
  grid: { flexDirection: 'row', gap: spacing.lg },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 44 },
  switchLabel: { ...typography.bodySemibold, color: colors.ink },
  label: { ...typography.monoMicro, color: colors.muted },
  alternatives: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  altChip: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.mint, borderRadius: radii.pill, paddingLeft: spacing.xl, paddingRight: spacing.xs, minHeight: 36 },
  altText: { ...typography.chip, fontSize: 12, color: colors.forest },
  altRemove: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  altRemoveText: { ...typography.bodyStrong, color: colors.forest },
});
