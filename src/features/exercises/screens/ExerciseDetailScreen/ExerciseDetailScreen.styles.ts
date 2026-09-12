import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  back: { position: 'absolute', left: spacing.screen, top: spacing.lg },
  body: { paddingTop: spacing.x4, paddingHorizontal: spacing.screen, paddingBottom: spacing.x7, gap: spacing.x3 },
  titleBlock: { gap: spacing.md },
  name: { ...typography.h2, color: colors.ink },
  target: { ...typography.monoXS, color: colors.forest },
  section: { gap: spacing.md },
  step: { flexDirection: 'row', gap: spacing.md },
  stepIndex: { ...typography.monoXS, color: colors.forest, width: 18 },
  stepText: { ...typography.body, color: colors.ink, flex: 1 },
  logRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingVertical: spacing.xl, paddingHorizontal: spacing.xxl },
  logDate: { ...typography.monoTag, color: colors.muted, width: 56 },
  logSets: { ...typography.bodySemibold, color: colors.ink, flex: 1 },
  logTop: { ...typography.monoXS, color: colors.forest },
  photoRow: { flexDirection: 'row', gap: spacing.lg },
});
