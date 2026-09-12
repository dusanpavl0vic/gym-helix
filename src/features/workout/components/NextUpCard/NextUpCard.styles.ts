import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  box: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: radii.xl, paddingVertical: spacing.xl, paddingHorizontal: spacing.xxl, gap: 3 },
  label: { ...typography.monoMicro, color: colors.muted },
  text: { ...typography.bodySemibold, color: colors.ink },
});
