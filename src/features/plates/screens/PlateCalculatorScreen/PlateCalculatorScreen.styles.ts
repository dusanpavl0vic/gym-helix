import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  label: { ...typography.monoMicro, color: colors.muted },
  perSide: { ...typography.monoL, color: colors.ink },
  total: { ...typography.bodySemibold, color: colors.slate },
  warning: { ...typography.caption, color: colors.danger },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
