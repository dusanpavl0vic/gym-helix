import { StyleSheet } from 'react-native';

import { chart } from '@/constants/charts';
import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  list: { gap: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  label: { ...typography.captionSemibold, color: colors.ink, width: chart.hbarLabelWidth },
  track: { flex: 1, height: chart.hbarHeight, justifyContent: 'center' },
  zone: { position: 'absolute', top: 0, bottom: 0, backgroundColor: chart.colors.target, borderRadius: 3 },
  bar: { height: chart.hbarHeight, borderTopRightRadius: chart.barRadius, borderBottomRightRadius: chart.barRadius },
  value: { ...typography.monoXS, color: colors.ink, width: chart.hbarValueWidth, textAlign: 'right' },
  baseline: { position: 'absolute', left: 0, top: -2, bottom: -2, width: 1, backgroundColor: chart.colors.grid, borderRadius: radii.xs },
});
