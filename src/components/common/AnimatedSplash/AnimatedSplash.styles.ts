import { StyleSheet } from 'react-native';

import { ICON_ACCENT_CIRCLE, SPLASH_LOGO_SIZE } from '@/constants/brand';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

const ACCENT_DIAMETER_RATIO = ICON_ACCENT_CIRCLE.r * 2 * 1.6;

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  accent: {
    position: 'absolute',
    top: '-12%',
    right: '-22%',
    width: `${ACCENT_DIAMETER_RATIO * 100}%`,
    aspectRatio: 1,
    borderRadius: 9999,
    backgroundColor: colors.restCard,
  },
  logo: { width: SPLASH_LOGO_SIZE, height: SPLASH_LOGO_SIZE },
  texts: { position: 'absolute', top: '50%', marginTop: SPLASH_LOGO_SIZE / 2 + spacing.x7, alignItems: 'center', gap: spacing.sm },
  title: { ...typography.h1, fontSize: 32, lineHeight: 40, color: colors.paperWarm },
  tagline: { ...typography.monoXS, color: colors.lime, letterSpacing: 2 },
});
