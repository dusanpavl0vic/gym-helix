import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { LOGO_TILE_PADDING, LOGO_TILE_RADIUS } from '@/constants/brand';

import { LOGO_XML } from './logo.generated';
import { styles } from './Logo.styles';
import type { LogoProps } from './Logo.types';

export function Logo({ size, withBackground }: LogoProps) {
  if (!withBackground) return <SvgXml xml={LOGO_XML} width={size} height={size} accessibilityRole="image" />;
  const inner = size * (1 - LOGO_TILE_PADDING * 2);
  return (
    <View style={[styles.tile, { width: size, height: size, borderRadius: size * LOGO_TILE_RADIUS }]} accessibilityRole="image">
      <SvgXml xml={LOGO_XML} width={inner} height={inner} />
    </View>
  );
}
