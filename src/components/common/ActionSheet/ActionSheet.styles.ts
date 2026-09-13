import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    minHeight: metrics.buttonHeight + 4,
    borderRadius: radii.xl,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.x3,
  },
  actionSelected: { borderColor: colors.forest, backgroundColor: colors.mint },
  texts: { flex: 1, gap: 2 },
  label: { ...typography.bodyStrong, fontSize: 15, lineHeight: 20, color: colors.ink },
  destructive: { color: colors.danger },
  description: { ...typography.small, color: colors.muted },
});
