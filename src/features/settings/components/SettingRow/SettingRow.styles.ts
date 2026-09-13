import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl, minHeight: metrics.buttonHeight },
  texts: { flex: 1, gap: 2 },
  label: { ...typography.bodySemibold, fontSize: 14, lineHeight: 19, color: colors.ink },
  description: { ...typography.small, color: colors.muted },
});
