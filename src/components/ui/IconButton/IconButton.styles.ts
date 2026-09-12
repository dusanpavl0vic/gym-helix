import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  base: { width: metrics.iconButton, height: metrics.iconButton, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center' },
  paper: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border },
  cream: { backgroundColor: colors.cream },
  mint: { backgroundColor: colors.mint },
  pressed: { opacity: 0.7 },
  glyph: { ...typography.title, fontSize: 16, color: colors.ink },
});
