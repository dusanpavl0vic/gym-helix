import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { paddingTop: spacing.sm, paddingHorizontal: spacing.screen, paddingBottom: spacing.xl, gap: spacing.xl, backgroundColor: colors.cream },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  center: { flex: 1, alignItems: 'center', gap: 1 },
  title: { ...typography.title, color: colors.ink },
  subtitle: { ...typography.monoTag, color: colors.muted },
  elapsed: { ...typography.monoS, fontSize: 14, color: colors.forest, backgroundColor: colors.mint, paddingVertical: 11, paddingHorizontal: spacing.lg, borderRadius: radii.md, overflow: 'hidden' },
});
