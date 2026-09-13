import { Dimensions, StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

const HANDLE_WIDTH = 44;
const HANDLE_HEIGHT = 5;

export const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: colors.backdrop },
  sheet: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: radii.hero,
    borderTopRightRadius: radii.hero,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.screen,
    gap: spacing.xl,
    maxHeight: Dimensions.get('window').height * metrics.sheetMaxHeightRatio,
  },
  handle: { alignSelf: 'center', width: HANDLE_WIDTH, height: HANDLE_HEIGHT, borderRadius: radii.pill, backgroundColor: colors.borderStrong },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.xl },
  title: { ...typography.h3, fontSize: 18, lineHeight: 24, color: colors.ink, flex: 1 },
  content: { gap: spacing.md, paddingBottom: spacing.xs },
});
