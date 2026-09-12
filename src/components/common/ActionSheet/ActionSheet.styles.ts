import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(20,35,27,.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: radii.hero,
    borderTopRightRadius: radii.hero,
    paddingTop: spacing.x5,
    paddingHorizontal: spacing.screen,
    gap: spacing.md,
  },
  handle: { alignSelf: 'center', width: 44, height: 5, borderRadius: radii.pill, backgroundColor: colors.borderStrong, marginBottom: spacing.sm },
  title: { ...typography.monoTag, color: colors.muted, marginBottom: spacing.xs },
  action: {
    minHeight: metrics.buttonHeight,
    borderRadius: radii.xl,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.x4,
    justifyContent: 'center',
  },
  actionSelected: { borderColor: colors.forest, backgroundColor: colors.mint },
  actionText: { ...typography.bodyStrong, fontSize: 15, color: colors.ink },
  destructive: { color: colors.danger },
  cancel: { marginTop: spacing.xs },
});
