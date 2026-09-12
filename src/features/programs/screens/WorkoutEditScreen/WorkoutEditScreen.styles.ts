import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  estimate: { ...typography.monoXS, color: colors.forest },
  list: { gap: spacing.xl },
});
