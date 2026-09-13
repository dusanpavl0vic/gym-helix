import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  list: { gap: spacing.md },
  brand: { alignItems: 'center', gap: spacing.md, marginTop: spacing.md },
  brandName: { ...typography.h3, color: colors.ink },
  version: { ...typography.small, color: colors.muted, textAlign: 'center' },
});
