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
    borderRadius: radii.xxl,
    padding: spacing.xxl,
    minHeight: 64,
  },
  pressed: { borderColor: colors.forest },
  texts: { flex: 1, gap: 3, minWidth: 0 },
  title: { ...typography.bodyStrong, color: colors.ink },
  subtitle: { ...typography.caption, color: colors.muted },
  chevron: { ...typography.monoM, fontFamily: undefined, fontSize: 20, color: colors.mutedLight },
});
