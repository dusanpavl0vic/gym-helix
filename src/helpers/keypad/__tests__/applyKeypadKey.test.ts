import { applyKeypadKey, keypadTextFromValue, parseKeypadText } from '../applyKeypadKey';

const kg = { decimal: true, maxIntegerDigits: 3, maxFractionDigits: 2 };
const reps = { decimal: false, maxIntegerDigits: 3, maxFractionDigits: 0 };

const type = (keys: Parameters<typeof applyKeypadKey>[1][], options = kg) => keys.reduce((text, key) => applyKeypadKey(text, key, options), '');

describe('applyKeypadKey', () => {
  it('builds decimal weights', () => {
    expect(type(['6', '2', 'decimal', '5'])).toBe('62.5');
    expect(type(['decimal', '5'])).toBe('0.5');
  });

  it('limits digits and ignores a second separator', () => {
    expect(type(['1', '2', '3', '4'])).toBe('123');
    expect(type(['1', 'decimal', '2', '5', '7'])).toBe('1.25');
    expect(type(['1', 'decimal', 'decimal'])).toBe('1.');
  });

  it('replaces a leading zero and supports backspace and clear', () => {
    expect(type(['0', '8'])).toBe('8');
    expect(type(['8', '0', 'backspace'])).toBe('8');
    expect(type(['8', 'clear'])).toBe('');
  });

  it('ignores the separator for whole numbers', () => {
    expect(type(['1', 'decimal', '2'], reps)).toBe('12');
  });

  it('parses and formats values', () => {
    expect(parseKeypadText('')).toBeNull();
    expect(parseKeypadText('62.5')).toBe(62.5);
    expect(parseKeypadText('0.')).toBe(0);
    expect(keypadTextFromValue(null)).toBe('');
    expect(keypadTextFromValue(62.5)).toBe('62.5');
  });
});
