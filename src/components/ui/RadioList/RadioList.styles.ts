import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

const RADIO = 22;
const DOT = 10;

export const styles = StyleSheet.create({
  list: { gap: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    minHeight: metrics.buttonHeight,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paperWarm,
  },
  rowSelected: { borderColor: colors.forest, backgroundColor: colors.mint },
  texts: { flex: 1, gap: 2 },
  label: { ...typography.bodyStrong, color: colors.ink },
  description: { ...typography.small, color: colors.muted },
  radio: { width: RADIO, height: RADIO, borderRadius: RADIO / 2, borderWidth: 2, borderColor: colors.mutedLight, alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: colors.forest },
  dot: { width: DOT, height: DOT, borderRadius: DOT / 2, backgroundColor: colors.forest },
});
