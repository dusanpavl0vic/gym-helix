import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  form: { gap: spacing.x3 },
  hint: { ...typography.caption, color: colors.slate },
  row: { flexDirection: 'row', gap: spacing.lg },
  field: { flex: 1, gap: spacing.sm },
  label: { ...typography.monoMicro, color: colors.muted },
  list: { gap: spacing.md },
});
