import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  card: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: radii.x4, padding: spacing.x3, gap: spacing.xl },
  head: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: spacing.md },
  title: { ...typography.bodyStrong, fontSize: 13, color: colors.ink, flex: 1 },
  value: { ...typography.monoXS, color: colors.forest },
  hint: { ...typography.small, color: colors.muted },
});
