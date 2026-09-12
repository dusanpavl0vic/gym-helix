import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 24 },
  title: { ...typography.h3, color: colors.ink },
  action: { minHeight: metrics.tapTarget, justifyContent: 'center' },
  actionText: { ...typography.captionSemibold, color: colors.forest },
});
