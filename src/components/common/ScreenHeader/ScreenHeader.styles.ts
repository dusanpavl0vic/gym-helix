import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { gap: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.xl },
  texts: { flex: 1, gap: 3 },
  eyebrow: { ...typography.monoEyebrow, color: colors.muted },
  title: { ...typography.h1, color: colors.ink },
  subtitle: { ...typography.body, color: colors.muted },
});
