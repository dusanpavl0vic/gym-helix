import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { applyKeypadKey, keypadTextFromValue, parseKeypadText, type KeypadKey } from '@/helpers/keypad/applyKeypadKey';
import { formatWeight } from '@/utils/number';

import { BottomSheet } from '../BottomSheet';
import { styles } from './NumericKeypadSheet.styles';
import type { NumericKeypadSheetProps } from './NumericKeypadSheet.types';

const DIGIT_ROWS: KeypadKey[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const MAX_INTEGER_DIGITS = 3;
const MAX_FRACTION_DIGITS = 2;

export function NumericKeypadSheet({
  visible, title, unitLabel, initialValue, decimal, quickSteps, submitLabel, clearLabel, closeLabel, onSubmit, onClose,
}: NumericKeypadSheetProps) {
  const { i18n } = useTranslation();
  const separator = i18n.language === 'en' ? '.' : ',';
  const [text, setText] = useState(keypadTextFromValue(initialValue));

  useEffect(() => {
    if (visible) setText(keypadTextFromValue(initialValue));
  }, [visible, initialValue]);

  const press = (key: KeypadKey) =>
    setText((current) => applyKeypadKey(current, key, { decimal, maxIntegerDigits: MAX_INTEGER_DIGITS, maxFractionDigits: MAX_FRACTION_DIGITS }));

  const adjust = (step: number) =>
    setText((current) => keypadTextFromValue(Math.max(0, Math.round(((parseKeypadText(current) ?? 0) + step) * 100) / 100)));

  const bottomLeft: KeypadKey = decimal ? 'decimal' : 'clear';
  const keys: KeypadKey[] = [...DIGIT_ROWS, bottomLeft, '0', 'backspace'];

  const renderKey = (key: KeypadKey) => {
    const label = key === 'decimal' ? separator : key === 'clear' ? 'C' : key;
    return (
      <Pressable
        key={key}
        accessibilityRole="button"
        accessibilityLabel={key === 'backspace' ? '⌫' : label}
        onPress={() => press(key)}
        style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}>
        {key === 'backspace' ? <Icon name="backspace" size={26} color="ink" /> : <Text style={styles.keyText}>{label}</Text>}
      </Pressable>
    );
  };

  return (
    <BottomSheet
      visible={visible}
      title={title}
      onClose={onClose}
      closeLabel={closeLabel}
      footer={
        <View style={styles.actions}>
          <Button label={clearLabel} variant="outline" onPress={() => setText('')} flex={1} />
          <Button label={submitLabel} icon="check" onPress={() => onSubmit(parseKeypadText(text))} flex={1.6} />
        </View>
      }>
      <View style={styles.display} accessibilityLiveRegion="polite">
        <Text style={[styles.value, text === '' && styles.placeholder]}>{text === '' ? '0' : text.replace('.', separator)}</Text>
        {unitLabel ? <Text style={styles.unit}>{unitLabel}</Text> : null}
      </View>
      {quickSteps && quickSteps.length > 0 ? (
        <View style={styles.quick}>
          {quickSteps.map((step) => (
            <Pressable key={step} accessibilityRole="button" onPress={() => adjust(step)} style={styles.quickButton}>
              <Text style={styles.quickText}>{`${step > 0 ? '+' : '−'}${formatWeight(Math.abs(step)).replace('.', separator)}`}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
      <View style={styles.grid}>{keys.map(renderKey)}</View>
    </BottomSheet>
  );
}
