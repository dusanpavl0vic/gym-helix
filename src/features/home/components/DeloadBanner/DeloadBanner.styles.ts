import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  box: { flexDirection: 'row', gap: spacing.xl, backgroundColor: colors.ink, borderRadius: radii.x3, padding: spacing.x4, alignItems: 'flex-start' },
  texts: { flex: 1, gap: spacing.xs },
  title: { ...typography.h3, color: colors.paperWarm },
  body: { ...typography.body, color: colors.sage },
});
