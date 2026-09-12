import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  box: { borderRadius: radii.xl, paddingVertical: spacing.xl, paddingHorizontal: spacing.xxl, gap: spacing.xs, borderWidth: 1 },
  increase: { backgroundColor: colors.mint, borderColor: colors.lime },
  neutral: { backgroundColor: colors.paper, borderColor: colors.border },
  recover: { backgroundColor: colors.dangerSoft, borderColor: colors.dangerSoft },
  lastTime: { ...typography.monoXS, color: colors.forest },
  suggestion: { ...typography.caption, color: colors.slate },
});
