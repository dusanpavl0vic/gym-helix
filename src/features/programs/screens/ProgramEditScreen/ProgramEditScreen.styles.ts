import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  section: { gap: spacing.md },
  hint: { ...typography.caption, color: colors.muted },
  actions: { gap: spacing.lg },
});
