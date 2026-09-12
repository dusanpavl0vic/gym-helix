import { StyleSheet } from 'react-native';

import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  item: {
    flex: 1,
    minHeight: metrics.buttonHeight,
    borderRadius: radii.xl,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  icon: { width: metrics.tabIcon, height: metrics.tabIcon, borderRadius: 6, borderWidth: 2.5 },
  label: { ...typography.tabLabel },
});
