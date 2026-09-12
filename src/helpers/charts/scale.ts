export interface Domain {
  min: number;
  max: number;
}

const niceStep = (rough: number): number => {
  const exponent = Math.floor(Math.log10(rough));
  const fraction = rough / 10 ** exponent;
  const nice = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 2.5 ? 2.5 : fraction <= 5 ? 5 : 10;
  return nice * 10 ** exponent;
};

/** Rounded axis ticks that cover the values. */
export function niceTicks(values: number[], count: number, zeroBased = false): number[] {
  if (values.length === 0) return [0, 1];
  let min = zeroBased ? 0 : Math.min(...values);
  let max = Math.max(...values);
  if (min === max) {
    const pad = Math.max(1, Math.abs(max) * 0.1);
    min = zeroBased ? 0 : min - pad;
    max += pad;
  }
  const step = niceStep((max - min) / Math.max(1, count - 1));
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= end + step / 2; v += step) ticks.push(Math.round(v * 1000) / 1000);
  return ticks;
}

export const linear = (domain: Domain, range: Domain) => (value: number): number => {
  const span = domain.max - domain.min || 1;
  return range.min + ((value - domain.min) / span) * (range.max - range.min);
};

export function nearestIndex(positions: number[], x: number): number {
  let best = 0;
  let bestDistance = Infinity;
  positions.forEach((p, i) => {
    const d = Math.abs(p - x);
    if (d < bestDistance) {
      best = i;
      bestDistance = d;
    }
  });
  return best;
}

export const compactNumber = (value: number): string => {
  const abs = Math.abs(value);
  if (abs >= 1000) return `${Math.round((value / 1000) * 10) / 10}k`;
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
};

/** Bar path with a rounded data end and a square baseline. */
export function roundedTopBarPath(x: number, y: number, width: number, height: number, radius: number): string {
  if (height <= 0) return '';
  const r = Math.min(radius, width / 2, height);
  const bottom = y + height;
  return [
    `M${x},${bottom}`,
    `L${x},${y + r}`,
    `Q${x},${y} ${x + r},${y}`,
    `L${x + width - r},${y}`,
    `Q${x + width},${y} ${x + width},${y + r}`,
    `L${x + width},${bottom}`,
    'Z',
  ].join(' ');
}
