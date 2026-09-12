import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type CardVariant = 'paper' | 'forest' | 'mint' | 'dashed';

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}
