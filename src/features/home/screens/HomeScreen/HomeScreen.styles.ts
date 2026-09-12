import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTexts: { gap: spacing.xxs, flex: 1 },
  date: { ...typography.monoEyebrow, color: colors.muted },
  greeting: { ...typography.h1, color: colors.ink },
  avatar: {
    width: metrics.avatar,
    height: metrics.avatar,
    borderRadius: metrics.avatar / 2,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...typography.h3, color: colors.paperWarm },
  stats: { flexDirection: 'row', gap: spacing.lg },
  quick: { flexDirection: 'row', gap: spacing.lg },
  section: { gap: spacing.lg },
});
