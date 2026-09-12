import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xxl,
    padding: spacing.xxl,
    gap: spacing.sm,
    minHeight: 92,
  },
  pressed: { borderColor: colors.forest },
  glyph: {
    width: 30,
    height: 30,
    borderRadius: radii.sm,
    backgroundColor: colors.mint,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 30,
    ...typography.monoS,
    color: colors.forest,
    overflow: 'hidden',
  },
  title: { ...typography.bodyStrong, color: colors.ink },
  hint: { ...typography.small, color: colors.muted },
});
