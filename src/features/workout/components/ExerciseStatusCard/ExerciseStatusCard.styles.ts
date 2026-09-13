import { StyleSheet } from 'react-native';

import type { ColorName } from '@/constants/colors';
import { colors } from '@/constants/colors';
import type { IconName } from '@/constants/icons';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

import type { ExerciseStatus } from '../../types';

export const STATUS_APPEARANCE: Record<ExerciseStatus, { icon: IconName; color: ColorName }> = {
  todo: { icon: 'status-todo', color: 'mutedLight' },
  partial: { icon: 'status-partial', color: 'lime' },
  done: { icon: 'status-done', color: 'forest' },
  skipped: { icon: 'status-skipped', color: 'danger' },
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.x3,
    padding: spacing.xl,
  },
  cardDone: { backgroundColor: colors.paperWarm },
  pressed: { borderColor: colors.forest },
  texts: { flex: 1, gap: 2, minWidth: 0 },
  name: { ...typography.title, color: colors.ink },
  scheme: { ...typography.caption, color: colors.muted },
  detail: { ...typography.captionSemibold, color: colors.forest },
  status: { alignItems: 'center', gap: 2, minWidth: 44 },
  progress: { ...typography.monoTag, color: colors.slate },
});
