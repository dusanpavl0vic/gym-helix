import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { paddingTop: spacing.sm, paddingHorizontal: spacing.screen, paddingBottom: spacing.xl, gap: spacing.xl, backgroundColor: colors.cream },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl },
  center: { flex: 1, gap: 1 },
  title: { ...typography.title, fontSize: 17, lineHeight: 22, color: colors.ink },
  subtitle: { ...typography.monoTag, color: colors.muted },
  elapsed: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.mint, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderRadius: radii.md },
  elapsedText: { ...typography.monoS, fontSize: 14, lineHeight: 19, color: colors.forest },
});
