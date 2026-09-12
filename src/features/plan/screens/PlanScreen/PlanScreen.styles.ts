import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  meta: { gap: spacing.xs },
  focus: { ...typography.bodySemibold, color: colors.slate },
  estimate: { ...typography.monoTag, color: colors.forest },
  list: { gap: spacing.lg },
  actions: { gap: spacing.lg },
});
