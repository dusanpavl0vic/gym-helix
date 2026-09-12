import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { gap: spacing.xl },
  table: { gap: spacing.sm },
  tableTitle: { ...typography.monoMicro, color: colors.muted },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl, paddingVertical: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  date: { ...typography.monoTag, color: colors.muted, width: 56 },
  detail: { ...typography.caption, color: colors.slate, flex: 1 },
  value: { ...typography.monoXS, color: colors.ink, borderRadius: radii.xs },
});
