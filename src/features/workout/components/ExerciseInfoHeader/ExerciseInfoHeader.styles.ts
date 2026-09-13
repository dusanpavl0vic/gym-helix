import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const IMAGE_SIZE = 76;

export const styles = StyleSheet.create({
  wrap: { gap: spacing.xl },
  top: { flexDirection: 'row', gap: spacing.xxl, alignItems: 'center' },
  texts: { flex: 1, gap: spacing.xs },
  name: { ...typography.h2, color: colors.ink },
  scheme: { ...typography.body, color: colors.muted },
  substituted: { ...typography.monoTag, color: colors.forest },
  noteRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  note: { ...typography.captionSemibold, color: colors.slate, flex: 1 },
  hint: { borderRadius: radii.xl, paddingVertical: spacing.xl, paddingHorizontal: spacing.xxl, gap: spacing.xs, borderWidth: 1 },
  increase: { backgroundColor: colors.mint, borderColor: colors.lime },
  decrease: { backgroundColor: colors.dangerSoft, borderColor: colors.dangerSoft },
  neutral: { backgroundColor: colors.paper, borderColor: colors.border },
  lastTime: { ...typography.monoXS, color: colors.forest },
  suggestion: { ...typography.caption, color: colors.slate },
  skipped: { ...typography.bodyStrong, color: colors.danger },
});
