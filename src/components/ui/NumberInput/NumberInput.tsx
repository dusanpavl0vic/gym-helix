import { useEffect, useState } from 'react';
import { TextInput } from 'react-native';

import { colors } from '@/constants/colors';
import { clamp, formatWeight } from '@/utils/number';

import { styles } from './NumberInput.styles';
import type { NumberInputProps } from './NumberInput.types';

const toText = (value: number | undefined) => (value === undefined ? '' : formatWeight(value));

export function NumberInput({ value, onChange, decimal, placeholder, min, max, style, accessibilityLabel, autoFocus }: NumberInputProps) {
  const [text, setText] = useState(toText(value));

  useEffect(() => {
    setText(toText(value));
  }, [value]);

  const commit = () => {
    const normalized = text.replace(',', '.').trim();
    if (normalized === '') {
      onChange(undefined);
      return;
    }
    const parsed = decimal ? Number.parseFloat(normalized) : Number.parseInt(normalized, 10);
    if (Number.isNaN(parsed)) {
      setText(toText(value));
      return;
    }
    onChange(clamp(parsed, min ?? -Infinity, max ?? Infinity));
  };

  return (
    <TextInput
      value={text}
      onChangeText={setText}
      onBlur={commit}
      onSubmitEditing={commit}
      keyboardType={decimal ? 'decimal-pad' : 'number-pad'}
      placeholder={placeholder}
      placeholderTextColor={colors.mutedLight}
      selectTextOnFocus
      autoFocus={autoFocus}
      returnKeyType="done"
      accessibilityLabel={accessibilityLabel}
      style={[styles.input, style]}
    />
  );
}
