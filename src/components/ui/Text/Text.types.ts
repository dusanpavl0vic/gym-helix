import type { TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native';

import type { ColorName } from '@/constants/colors';
import type { TypographyVariant } from '@/constants/typography';

export interface TextProps extends Omit<RNTextProps, 'style'> {
  variant?: TypographyVariant;
  color?: ColorName;
  align?: TextStyle['textAlign'];
  uppercase?: boolean;
  style?: StyleProp<TextStyle>;
}
