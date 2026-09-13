import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

const OPTION_MIN_HEIGHT = 64;

export const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  option: {
    width: '31%',
    flexGrow: 1,
    minHeight: OPTION_MIN_HEIGHT,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paperWarm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
  },
  selected: { backgroundColor: colors.forest, borderColor: colors.forest },
  label: { ...typography.captionSemibold, color: colors.ink },
  labelSelected: { color: colors.paperWarm },
});
