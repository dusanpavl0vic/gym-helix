import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.xl, minHeight: metrics.buttonHeight },
  label: { ...typography.bodySemibold, fontSize: 14, color: colors.ink, flex: 1 },
});
