import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { colors } from '@/constants/colors';

import { DEFAULT_ICON_SIZE } from './Icon.styles';
import type { IconProps } from './Icon.types';
import { ICON_XML } from './icons.generated';

export function Icon({ name, size = DEFAULT_ICON_SIZE, color = 'ink', style }: IconProps) {
  const xml = ICON_XML[name];
  if (!xml) return <View style={[{ width: size, height: size }, style]} />;
  return <SvgXml xml={xml} width={size} height={size} color={colors[color]} style={style} />;
}
