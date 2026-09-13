import type { StyleProp, ViewStyle } from 'react-native';

import type { ColorName } from '@/constants/colors';
import type { IconName } from '@/constants/icons';

export type IconButtonVariant = 'paper' | 'cream' | 'mint' | 'ghost' | 'dark';

export interface IconButtonProps {
  icon: IconName;
  onPress: () => void;
  accessibilityLabel: string;
  variant?: IconButtonVariant;
  color?: ColorName;
  size?: 'md' | 'lg';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
