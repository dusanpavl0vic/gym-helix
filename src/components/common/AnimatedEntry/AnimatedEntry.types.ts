import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface AnimatedEntryProps {
  children: ReactNode;
  index?: number;
  style?: StyleProp<ViewStyle>;
}
