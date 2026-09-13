import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const BADGE = 96;

export const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', gap: spacing.xl, paddingVertical: spacing.x3 },
  badge: { width: BADGE, height: BADGE, borderRadius: BADGE / 2, backgroundColor: colors.forest, alignItems: 'center', justifyContent: 'center' },
  label: { ...typography.h2, color: colors.ink },
});
