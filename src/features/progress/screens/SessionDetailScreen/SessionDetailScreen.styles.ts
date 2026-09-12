import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  stats: { flexDirection: 'row', gap: spacing.lg },
  section: { gap: spacing.md },
  substituted: { ...typography.monoTag, color: colors.forest },
  notes: { ...typography.body, color: colors.ink },
});
