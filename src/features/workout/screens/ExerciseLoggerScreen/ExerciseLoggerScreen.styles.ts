import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.screen, paddingVertical: spacing.md, gap: spacing.xl },
  position: { ...typography.monoTag, color: colors.muted, flex: 1, textAlign: 'center' },
  content: { paddingHorizontal: spacing.screen, paddingBottom: spacing.x5, gap: spacing.x3 },
  sets: { gap: spacing.md },
  footer: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.screen,
    backgroundColor: colors.cream,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
