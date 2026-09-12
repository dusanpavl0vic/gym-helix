export interface PlateResult {
  perSide: number[];
  achievedKg: number;
  remainderKg: number;
  belowBar: boolean;
}

const SCALE = 100;

export function calculatePlates(targetKg: number, barKg: number, availablePlates: readonly number[]): PlateResult {
  if (targetKg <= barKg) {
    return { perSide: [], achievedKg: barKg, remainderKg: Math.max(0, targetKg - barKg), belowBar: targetKg < barKg };
  }
  let remainingPerSide = Math.round(((targetKg - barKg) / 2) * SCALE);
  const perSide: number[] = [];
  const sorted = [...availablePlates].sort((a, b) => b - a);
  for (const plate of sorted) {
    const scaled = Math.round(plate * SCALE);
    while (scaled > 0 && remainingPerSide >= scaled) {
      perSide.push(plate);
      remainingPerSide -= scaled;
    }
  }
  const loadedPerSide = perSide.reduce((sum, p) => sum + p, 0);
  const achievedKg = barKg + loadedPerSide * 2;
  return { perSide, achievedKg, remainderKg: Math.round((targetKg - achievedKg) * SCALE) / SCALE, belowBar: false };
}
