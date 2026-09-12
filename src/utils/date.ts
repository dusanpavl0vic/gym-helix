import { differenceInCalendarDays, startOfDay, startOfWeek, subDays } from 'date-fns';

export const nowIso = (): string => new Date().toISOString();

export function daysSince(iso: string | undefined, now: Date = new Date()): number | null {
  if (!iso) return null;
  return differenceInCalendarDays(startOfDay(now), startOfDay(new Date(iso)));
}

export function weekStart(date: Date): Date {
  return startOfWeek(date, { weekStartsOn: 1 });
}

export function lastNDays(n: number, now: Date = new Date()): Date[] {
  return Array.from({ length: n }, (_, i) => startOfDay(subDays(now, n - 1 - i)));
}

export function isSameDayIso(iso: string, day: Date): boolean {
  return differenceInCalendarDays(startOfDay(new Date(iso)), startOfDay(day)) === 0;
}
