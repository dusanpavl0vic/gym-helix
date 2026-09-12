import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  hint: { ...typography.caption, color: colors.slate },
  list: { gap: spacing.md },
});
