import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  box: { backgroundColor: colors.ink, borderRadius: radii.x3, padding: spacing.x4, gap: spacing.lg },
  title: { ...typography.h3, color: colors.paperWarm },
  body: { ...typography.body, color: colors.sage },
  actions: { flexDirection: 'row', gap: spacing.lg },
});
