import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  error: { ...typography.caption, color: colors.danger },
  compare: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  compareCell: { width: '31%', flexGrow: 1, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: radii.lg, padding: spacing.lg, gap: 3 },
  compareLabel: { ...typography.monoMicro, color: colors.muted },
  compareValue: { ...typography.monoM, fontSize: 18, color: colors.ink },
  compareDelta: { ...typography.monoTag, color: colors.forest },
  list: { gap: spacing.md },
});
