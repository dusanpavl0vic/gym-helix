import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

const LABEL_WIDTH = 58;

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  label: { ...typography.monoXS, color: colors.muted, width: LABEL_WIDTH },
  button: {
    width: metrics.valueControlButton,
    height: metrics.valueControlButton,
    borderRadius: radii.xl,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: { backgroundColor: colors.mintSoft },
  value: {
    flex: 1,
    height: metrics.valueControlButton,
    borderRadius: radii.xl,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  valuePressed: { borderColor: colors.forest },
  valueText: { ...typography.monoValue, color: colors.ink },
  placeholder: { ...typography.monoS, color: colors.mutedLight },
  unit: { ...typography.monoTag, color: colors.muted },
});
