import type { StyleProp, ViewStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'lime' | 'dark' | 'outline' | 'outlineDark' | 'ghost' | 'danger';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  flex?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}
