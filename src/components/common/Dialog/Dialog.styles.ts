import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

const MAX_WIDTH = 420;

export const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: colors.backdrop, alignItems: 'center', justifyContent: 'center', padding: spacing.x5 },
  card: {
    width: '100%',
    maxWidth: MAX_WIDTH,
    backgroundColor: colors.cream,
    borderRadius: radii.hero,
    padding: spacing.x6,
    gap: spacing.x3,
  },
  iconCircle: {
    width: metrics.dialogIcon,
    height: metrics.dialogIcon,
    borderRadius: metrics.dialogIcon / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mint,
  },
  iconCircleDanger: { backgroundColor: colors.dangerSoft },
  title: { ...typography.h2, color: colors.ink },
  message: { ...typography.body, fontSize: 14, lineHeight: 20, color: colors.slate },
  actions: { gap: spacing.md, marginTop: spacing.xs },
});
