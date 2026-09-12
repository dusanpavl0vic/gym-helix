import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  flex: { flex: 1 },
  content: { paddingTop: spacing.md, paddingHorizontal: spacing.screen, paddingBottom: spacing.x7, gap: spacing.x4 },
  footer: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.screen,
    backgroundColor: colors.cream,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
