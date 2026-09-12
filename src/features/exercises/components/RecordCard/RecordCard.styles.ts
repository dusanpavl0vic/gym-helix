import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  box: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: radii.x3, padding: spacing.x3, gap: spacing.lg },
  title: { ...typography.monoXS, color: colors.muted },
  row: { flexDirection: 'row', gap: spacing.x5 },
  col: { gap: spacing.xxs, flex: 1 },
  value: { ...typography.monoL, color: colors.ink },
  label: { ...typography.small, color: colors.muted },
});
