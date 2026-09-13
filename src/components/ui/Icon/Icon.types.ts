import type { StyleProp, ViewStyle } from 'react-native';

import type { ColorName } from '@/constants/colors';
import type { IconName } from '@/constants/icons';

export interface IconProps {
  name: IconName;
  size?: number;
  color?: ColorName;
  style?: StyleProp<ViewStyle>;
}
