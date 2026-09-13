export type KeypadKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'decimal' | 'backspace' | 'clear';

export interface KeypadOptions {
  decimal: boolean;
  maxIntegerDigits: number;
  maxFractionDigits: number;
}

/** Applies one keypad key to the text being typed. The text always uses '.' as the decimal separator. */
export function applyKeypadKey(text: string, key: KeypadKey, options: KeypadOptions): string {
  if (key === 'clear') return '';
  if (key === 'backspace') return text.slice(0, -1);
  if (key === 'decimal') {
    if (!options.decimal || text.includes('.')) return text;
    return text === '' ? '0.' : `${text}.`;
  }
  const [integer, fraction] = text.split('.');
  if (fraction !== undefined) {
    return fraction.length >= options.maxFractionDigits ? text : `${text}${key}`;
  }
  if (integer === '0') return key;
  return integer.length >= options.maxIntegerDigits ? text : `${text}${key}`;
}

export function parseKeypadText(text: string): number | null {
  if (text === '') return null;
  const value = Number.parseFloat(text);
  return Number.isNaN(value) ? null : value;
}

export function keypadTextFromValue(value: number | null): string {
  if (value === null) return '';
  return String(Math.round(value * 100) / 100);
}
