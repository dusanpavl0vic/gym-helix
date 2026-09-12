import type { TextInputProps } from 'react-native';

export interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
}
