import { StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radii } from '@/constants/radii';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export const styles = StyleSheet.create({
  list: { gap: spacing.md },
  glyph: { width: 38, height: 38, borderRadius: radii.md, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center' },
  glyphText: { ...typography.monoS, color: colors.forest },
  version: { ...typography.small, color: colors.muted, textAlign: 'center' },
});
