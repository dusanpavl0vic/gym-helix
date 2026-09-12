import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  box: { backgroundColor: colors.mint, borderRadius: radii.xxl, padding: spacing.x3, gap: spacing.md },
  title: { ...typography.monoTag, color: colors.forest },
  step: { flexDirection: 'row', gap: spacing.md },
  index: { ...typography.monoTag, color: colors.forest, width: 16 },
  text: { ...typography.body, color: colors.ink, flex: 1 },
});
