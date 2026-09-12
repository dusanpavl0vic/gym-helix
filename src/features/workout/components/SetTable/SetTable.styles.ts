import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { gap: spacing.md },
  head: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg + 1.5 },
  headSet: { ...typography.monoMicro, color: colors.muted, width: 34, textAlign: 'center' },
  headCell: { ...typography.monoMicro, color: colors.muted, flex: 1, textAlign: 'center' },
  headMark: { width: 34 },
});
