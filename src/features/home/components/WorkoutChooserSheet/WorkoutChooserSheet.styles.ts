import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.x3,
    padding: spacing.xxl,
  },
  optionNext: { borderColor: colors.forest, borderWidth: 1.5 },
  pressed: { backgroundColor: colors.mint },
  badge: { width: metrics.iconButtonLarge, height: metrics.iconButtonLarge, borderRadius: radii.lg, backgroundColor: colors.forest, alignItems: 'center', justifyContent: 'center' },
  badgeText: { ...typography.monoS, color: colors.lime },
  texts: { flex: 1, gap: 2 },
  name: { ...typography.title, color: colors.ink },
  focus: { ...typography.caption, color: colors.slate },
  meta: { ...typography.monoTag, color: colors.muted },
  chips: { alignItems: 'flex-end', gap: spacing.xs },
});
