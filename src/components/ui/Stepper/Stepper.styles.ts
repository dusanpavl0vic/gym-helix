import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  wrap: { gap: spacing.xs, flex: 1 },
  label: { ...typography.monoMicro, color: colors.muted, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  button: {
    width: metrics.tapTarget,
    height: metrics.tapTarget,
    borderRadius: radii.md,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCompact: { width: 38 },
  buttonPressed: { backgroundColor: colors.mintSoft },
  buttonText: { ...typography.monoM, color: colors.forest },
  input: { flex: 1 },
});
