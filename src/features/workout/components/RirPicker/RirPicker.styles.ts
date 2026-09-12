import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  label: { ...typography.monoMicro, color: colors.muted },
  row: { flexDirection: 'row', gap: spacing.sm },
  chip: { flex: 1, minHeight: 40, borderRadius: radii.sm, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.paper, alignItems: 'center', justifyContent: 'center' },
  chipSelected: { backgroundColor: colors.forest, borderColor: colors.forest },
  chipText: { ...typography.monoS, color: colors.slate },
  chipTextSelected: { color: colors.paperWarm },
});
