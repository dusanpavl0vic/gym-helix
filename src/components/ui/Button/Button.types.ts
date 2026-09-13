import type { StyleProp, ViewStyle } from 'react-native';

import type { IconName } from '@/constants/icons';

export type ButtonVariant = 'primary' | 'lime' | 'dark' | 'outline' | 'outlineDark' | 'ghost' | 'danger' | 'dangerSolid';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  disabled?: boolean;
  flex?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}
