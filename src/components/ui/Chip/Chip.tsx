import { Text, View } from 'react-native';

import { labelStyles, styles, variantStyles } from './Chip.styles';
import type { ChipProps } from './Chip.types';

export function Chip({ label, variant = 'mint', style }: ChipProps) {
  return (
    <View style={[styles.base, variantStyles[variant], style]}>
      <Text style={labelStyles[variant]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}
