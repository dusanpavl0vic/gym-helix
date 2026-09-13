import { StyleSheet } from 'react-native';

import type { ColorName } from '@/constants/colors';
import { colors } from '@/constants/colors';
import { metrics } from '@/constants/metrics';
import { radii } from '@/constants/radii';

import type { IconButtonVariant } from './IconButton.types';

export const ICON_SIZE = { md: 20, lg: 24 } as const;

export const DEFAULT_ICON_COLOR: Record<IconButtonVariant, ColorName> = {
  paper: 'ink',
  cream: 'ink',
  mint: 'forest',
  ghost: 'ink',
  dark: 'paperWarm',
};

export const styles = StyleSheet.create({
  md: { width: metrics.iconButton, height: metrics.iconButton, borderRadius: radii.md, alignItems: 'center', justifyContent: 'center' },
  lg: { width: metrics.iconButtonLarge, height: metrics.iconButtonLarge, borderRadius: radii.lg, alignItems: 'center', justifyContent: 'center' },
  paper: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.border },
  cream: { backgroundColor: colors.cream },
  mint: { backgroundColor: colors.mint },
  ghost: { backgroundColor: colors.transparent },
  dark: { backgroundColor: colors.ink },
  pressed: { opacity: 0.75 },
});
