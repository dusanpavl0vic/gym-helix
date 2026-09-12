import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border, borderRadius: radii.xxl, padding: spacing.lg },
  pressed: { borderColor: colors.forest },
  texts: { flex: 1, gap: 3 },
  name: { ...typography.bodyStrong, color: colors.ink },
  subtitle: { ...typography.caption, color: colors.muted },
});
