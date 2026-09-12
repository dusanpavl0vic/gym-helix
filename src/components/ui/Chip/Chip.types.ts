import type { StyleProp, ViewStyle } from 'react-native';

export type ChipVariant = 'mint' | 'onDark' | 'lime' | 'outline';

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  style?: StyleProp<ViewStyle>;
}
