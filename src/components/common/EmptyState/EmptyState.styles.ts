import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  box: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    borderRadius: radii.xxl,
    padding: spacing.x5,
    gap: spacing.xl,
    alignItems: 'center',
  },
  text: { ...typography.body, color: colors.muted, textAlign: 'center' },
});
