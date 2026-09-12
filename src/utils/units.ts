export type WeightUnit = 'kg' | 'lb';

const LB_PER_KG = 2.20462;

export const kgToUnit = (kg: number, unit: WeightUnit): number => (unit === 'kg' ? kg : kg * LB_PER_KG);
export const unitToKg = (value: number, unit: WeightUnit): number => (unit === 'kg' ? value : value / LB_PER_KG);
