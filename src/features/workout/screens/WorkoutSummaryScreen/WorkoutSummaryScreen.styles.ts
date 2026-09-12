import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  title: { ...typography.h1, color: colors.ink, textAlign: 'center' },
  stats: { flexDirection: 'row', gap: spacing.lg },
  section: { gap: spacing.lg },
  record: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  recordName: { ...typography.bodyStrong, color: colors.paperWarm, flex: 1 },
  recordValue: { ...typography.monoS, color: colors.lime },
  noRecords: { ...typography.body, color: colors.muted },
});
