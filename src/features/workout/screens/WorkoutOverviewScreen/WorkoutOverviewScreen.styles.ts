import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  content: { paddingTop: spacing.xs, paddingHorizontal: spacing.screen, paddingBottom: spacing.x7, gap: spacing.lg },
  hint: { ...typography.caption, color: colors.muted, marginBottom: spacing.xs },
  deload: { flexDirection: 'row', gap: spacing.lg, alignItems: 'center', backgroundColor: colors.mint, borderRadius: radii.xl, padding: spacing.xl },
  deloadText: { ...typography.captionSemibold, color: colors.forest, flex: 1 },
  footer: { paddingTop: spacing.xl, paddingHorizontal: spacing.screen, backgroundColor: colors.cream, borderTopWidth: 1, borderTopColor: colors.border },
});
