import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';

export const styles = StyleSheet.create({
  base: { borderRadius: radii.xxl, padding: spacing.xxl, gap: spacing.md },
  pressed: { borderColor: colors.forest },
});

export const variantStyles = StyleSheet.create({
  paper: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border },
  forest: { backgroundColor: colors.forest },
  mint: { backgroundColor: colors.mint },
  dashed: { backgroundColor: colors.mint, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.lime },
});
