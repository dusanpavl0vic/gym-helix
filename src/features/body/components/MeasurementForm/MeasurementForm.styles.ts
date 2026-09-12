import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg },
  cell: { width: '47%', flexGrow: 1, gap: spacing.sm },
  label: { ...typography.monoMicro, color: colors.muted },
});
