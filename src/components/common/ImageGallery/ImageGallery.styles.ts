import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.mint, overflow: 'hidden' },
  rounded: { borderRadius: radii.x5 },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.lime,
  },
  placeholderLabel: { ...typography.monoTag, color: colors.forest },
  placeholderCaption: { ...typography.small, color: colors.muted },
  image: { backgroundColor: colors.white },
  dots: { position: 'absolute', bottom: spacing.lg, alignSelf: 'center', flexDirection: 'row', gap: spacing.sm },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.borderStrong },
  dotActive: { backgroundColor: colors.forest, width: 18 },
});
