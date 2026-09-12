import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.x3,
    padding: spacing.xl,
  },
  pressed: { borderColor: colors.forest },
  texts: { flex: 1, gap: spacing.xs, minWidth: 0 },
  name: { ...typography.title, color: colors.ink },
  scheme: { ...typography.caption, color: colors.muted },
  rest: { ...typography.monoTag, color: colors.forest },
  note: { ...typography.small, color: colors.slate },
  chevron: { fontSize: 20, color: colors.mutedLight },
});
