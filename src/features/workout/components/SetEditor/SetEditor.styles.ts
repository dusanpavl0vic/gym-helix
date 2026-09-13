import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { gap: spacing.lg },
  title: { ...typography.monoXS, color: colors.forest },
});
