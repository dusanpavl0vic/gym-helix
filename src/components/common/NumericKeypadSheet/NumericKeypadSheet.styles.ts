import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  display: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.x3,
    paddingVertical: spacing.xl,
  },
  value: { ...typography.monoDisplay, color: colors.ink },
  placeholder: { color: colors.mutedLight },
  unit: { ...typography.monoS, color: colors.muted },
  quick: { flexDirection: 'row', gap: spacing.md },
  quickButton: {
    flex: 1,
    minHeight: metrics.tapTarget,
    borderRadius: radii.lg,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickText: { ...typography.monoS, color: colors.forest },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  key: {
    width: '31.5%',
    flexGrow: 1,
    height: metrics.keypadKeyHeight,
    borderRadius: radii.xl,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyPressed: { backgroundColor: colors.mint },
  keyText: { ...typography.monoL, fontSize: 26, lineHeight: 34, color: colors.ink },
  actions: { flexDirection: 'row', gap: spacing.lg },
});
