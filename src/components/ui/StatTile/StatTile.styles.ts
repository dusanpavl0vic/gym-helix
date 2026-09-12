import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  paper: {
    flex: 1,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xxl,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    gap: spacing.xs,
  },
  forest: { flex: 1, backgroundColor: colors.forest, borderRadius: radii.xxl, padding: spacing.xxl, gap: spacing.xs },
  valuePaper: { ...typography.monoM, color: colors.ink },
  labelPaper: { ...typography.label, color: colors.muted },
  labelForest: { ...typography.monoMicro, color: colors.lime },
  valueForest: { ...typography.monoL, color: colors.paperWarm },
  note: { ...typography.small, color: colors.sage },
});
