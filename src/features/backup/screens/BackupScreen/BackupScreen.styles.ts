import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  title: { ...typography.h3, color: colors.ink },
  body: { ...typography.body, color: colors.muted },
  success: { ...typography.bodySemibold, color: colors.forest },
  error: { ...typography.bodySemibold, color: colors.danger },
});
