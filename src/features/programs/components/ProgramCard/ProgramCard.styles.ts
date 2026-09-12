import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  card: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: radii.x3, padding: spacing.x3, gap: spacing.xl },
  active: { borderColor: colors.forest, borderWidth: 1.5 },
  head: { gap: spacing.sm },
  badges: { flexDirection: 'row', gap: spacing.sm },
  name: { ...typography.h3, fontSize: 18, lineHeight: 22, color: colors.ink },
  subtitle: { ...typography.caption, color: colors.muted },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
});
