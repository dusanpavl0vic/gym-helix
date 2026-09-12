import type { StyleProp, ViewStyle } from 'react-native';

export interface IconButtonProps {
  glyph: string;
  onPress: () => void;
  accessibilityLabel: string;
  variant?: 'paper' | 'cream' | 'mint';
  style?: StyleProp<ViewStyle>;
}
