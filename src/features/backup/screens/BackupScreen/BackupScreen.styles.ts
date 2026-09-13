import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  title: { ...typography.h3, color: colors.ink },
  body: { ...typography.body, color: colors.muted },
  status: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  success: { ...typography.bodySemibold, color: colors.forest, flex: 1 },
  error: { ...typography.bodySemibold, color: colors.danger, flex: 1 },
});
