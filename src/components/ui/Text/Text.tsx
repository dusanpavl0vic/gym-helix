import { Text as RNText } from 'react-native';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

import { styles } from './Text.styles';
import type { TextProps } from './Text.types';

export function Text({ variant = 'body', color = 'ink', align, uppercase, style, ...rest }: TextProps) {
  return (
    <RNText
      {...rest}
      style={[typography[variant], { color: colors[color] }, align && { textAlign: align }, uppercase && styles.uppercase, style]}
    />
  );
}
