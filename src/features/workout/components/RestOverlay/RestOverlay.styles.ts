import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.restBg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.x7,
    padding: spacing.x8,
  },
  title: { ...typography.monoXS, color: colors.lime, letterSpacing: 2 },
  card: {
    alignSelf: 'stretch',
    backgroundColor: colors.restCard,
    borderWidth: 1,
    borderColor: colors.forest,
    borderRadius: radii.x3,
    paddingVertical: spacing.x3,
    paddingHorizontal: spacing.x4,
    gap: spacing.sm,
  },
  kind: { ...typography.monoMicro, color: colors.lime },
  nextTitle: { ...typography.bodyStrong, fontSize: 17, lineHeight: 21, color: colors.paperWarm },
  nextMeta: { ...typography.body, color: colors.sage },
  actions: { alignSelf: 'stretch', flexDirection: 'row', gap: spacing.lg },
});
