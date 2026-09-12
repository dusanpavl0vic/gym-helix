export const roundTo = (value: number, step: number): number => Math.round(value / step) * step;

export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export function formatWeight(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(value * 10 === Math.round(value * 10) ? 1 : 2);
}

export const toTonnes = (kg: number): string => (kg / 1000).toFixed(1);
