import type { StyleProp, TextStyle } from 'react-native';

export interface NumberInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  decimal?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  style?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  autoFocus?: boolean;
}
