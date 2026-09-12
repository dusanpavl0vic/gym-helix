import { Text, TextInput, View } from 'react-native';

import { colors } from '@/constants/colors';

import { styles } from './TextField.styles';
import type { TextFieldProps } from './TextField.types';

export function TextField({ label, multiline, ...rest }: TextFieldProps) {
  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label.toUpperCase()}</Text> : null}
      <TextInput
        {...rest}
        multiline={multiline}
        accessibilityLabel={label}
        placeholderTextColor={colors.mutedLight}
        style={[styles.input, multiline && styles.multiline]}
      />
    </View>
  );
}
