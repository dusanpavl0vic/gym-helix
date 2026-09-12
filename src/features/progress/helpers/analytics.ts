import { addWeeks, isWithinInterval, subDays } from 'date-fns';

import { MUSCLE_GROUPS } from '@/constants/muscles';
import { bestE1RM, bestSet } from '@/features/exercises/logic/e1rm';
import type { BodyMeasurement, CardioSession, Exercise, MuscleGroup, Session } from '@/types/domain';
import { weekStart } from '@/utils/date';

import { sessionSetCount, sessionVolumeKg } from '../logic/volume';

export type ExerciseMetric = 'topWeight' | 'e1rm' | 'volume' | 'reps';

export interface ExercisePoint {
  sessionId: string;
  date: string;
  topWeight: number;
  topReps: number;
  e1rm: number;
  volume: number;
  reps: number;
  sets: number;
}

/** Per-session metrics for one exercise, oldest first. */
export function exerciseSeries(sessions: Session[], exerciseId: string): ExercisePoint[] {
  const points: ExercisePoint[] = [];
  for (const session of sessions) {
    const sets = session.exercises.filter((e) => e.exerciseId === exerciseId && !e.skipped).flatMap((e) => e.sets);
    if (sets.length === 0) continue;
    const top = bestSet(sets);
    points.push({
      sessionId: session.id,
      date: session.startedAt,
      topWeight: top?.weightKg ?? 0,
      topReps: top?.reps ?? 0,
      e1rm: Math.round(bestE1RM(sets) * 10) / 10,
      volume: sets.reduce((sum, s) => sum + s.weightKg * s.reps, 0),
      reps: sets.reduce((sum, s) => sum + s.reps, 0),
      sets: sets.length,
    });
  }
  return points.sort((a, b) => a.date.localeCompare(b.date));
}

/** Exercise ids ordered by how often they were logged. */
export function loggedExerciseIds(sessions: Session[]): string[] {
  const counts = new Map<string, number>();
  for (const session of sessions) {
    for (const e of session.exercises) {
      if (!e.skipped && e.sets.length > 0) counts.set(e.exerciseId, (counts.get(e.exerciseId) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
}

export interface PersonalRecord {
  exerciseId: string;
  weightKg: number;
  reps: number;
  e1rm: number;
  date: string;
}

export function personalRecords(sessions: Session[]): PersonalRecord[] {
  const records = new Map<string, PersonalRecord>();
  for (const session of sessions) {
    for (const e of session.exercises) {
      for (const set of e.sets) {
        const current = records.get(e.exerciseId);
        if (!current || set.weightKg > current.weightKg || (set.weightKg === current.weightKg && set.reps > current.reps)) {
          records.set(e.exerciseId, {
            exerciseId: e.exerciseId,
            weightKg: set.weightKg,
            reps: set.reps,
            e1rm: Math.round(bestE1RM([set]) * 10) / 10,
            date: session.startedAt,
          });
        }
      }
    }
  }
  return [...records.values()].sort((a, b) => b.e1rm - a.e1rm);
}

/** Records set in `session` compared to all earlier sessions. */
export function newRecordsIn(session: Session, previous: Session[]): PersonalRecord[] {
  const before = new Map(personalRecords(previous.filter((s) => s.id !== session.id)).map((r) => [r.exerciseId, r]));
  return personalRecords([session]).filter((r) => {
    const old = before.get(r.exerciseId);
    return r.weightKg > 0 && (!old || r.weightKg > old.weightKg || (r.weightKg === old.weightKg && r.reps > old.reps));
  });
}

export interface WeekBucket {
  weekStart: Date;
  value: number;
}

function weekBuckets<T>(items: T[], getDate: (item: T) => string, getValue: (item: T) => number, weeks: number, now: Date): WeekBucket[] {
  const first = addWeeks(weekStart(now), -(weeks - 1));
  const buckets = Array.from({ length: weeks }, (_, i) => ({ weekStart: addWeeks(first, i), value: 0 }));
  for (const item of items) {
    const start = weekStart(new Date(getDate(item))).getTime();
    const bucket = buckets.find((b) => b.weekStart.getTime() === start);
    if (bucket) bucket.value += getValue(item);
  }
  return buckets;
}

export const weeklyVolumeBuckets = (sessions: Session[], weeks: number, now = new Date()) =>
  weekBuckets(sessions, (s) => s.startedAt, sessionVolumeKg, weeks, now);

export const weeklySessionCount = (sessions: Session[], weeks: number, now = new Date()) =>
  weekBuckets(sessions, (s) => s.startedAt, () => 1, weeks, now);

export const weeklyCardioMinutes = (entries: CardioSession[], weeks: number, now = new Date()) =>
  weekBuckets(entries, (e) => e.date, (e) => e.durationMin, weeks, now);

export function sessionDurationMin(session: Session): number {
  if (!session.finishedAt) return 0;
  return Math.max(1, Math.round((new Date(session.finishedAt).getTime() - new Date(session.startedAt).getTime()) / 60000));
}

/** Working sets per muscle group in the week containing `now` (secondary muscles count half). */
export function setsPerMuscle(sessions: Session[], exercises: Record<string, Exercise>, now = new Date()): Record<MuscleGroup, number> {
  const start = weekStart(now);
  const end = addWeeks(start, 1);
  const totals = Object.fromEntries(MUSCLE_GROUPS.map((m) => [m, 0])) as Record<MuscleGroup, number>;
  for (const session of sessions) {
    const date = new Date(session.startedAt);
    if (date < start || date >= end) continue;
    for (const e of session.exercises) {
      const exercise = exercises[e.exerciseId];
      if (!exercise || e.sets.length === 0) continue;
      exercise.primaryMuscles.forEach((m) => { totals[m] += e.sets.length; });
      exercise.secondaryMuscles.forEach((m) => { totals[m] += e.sets.length / 2; });
    }
  }
  return totals;
}

export function volumeInLastDays(sessions: Session[], days: number, now = new Date()): number {
  const interval = { start: subDays(now, days), end: now };
  return sessions.filter((s) => isWithinInterval(new Date(s.startedAt), interval)).reduce((sum, s) => sum + sessionVolumeKg(s), 0);
}

export function totalSets(sessions: Session[]): number {
  return sessions.reduce((sum, s) => sum + sessionSetCount(s), 0);
}

export type BodyField = 'weightKg' | 'waistCm' | 'armCm' | 'chestCm' | 'thighCm';
export const BODY_FIELDS: BodyField[] = ['weightKg', 'waistCm', 'armCm', 'chestCm', 'thighCm'];

export function bodySeries(measurements: BodyMeasurement[], field: BodyField): { x: number; y: number }[] {
  return measurements
    .filter((m) => m[field] !== undefined)
    .map((m) => ({ x: new Date(m.date).getTime(), y: m[field] as number }))
    .sort((a, b) => a.x - b.x);
}

/** Change from the closest measurement at least `days` old to the latest one. */
export function bodyDelta(measurements: BodyMeasurement[], field: BodyField, days: number, now = new Date()) {
  const series = bodySeries(measurements, field);
  if (series.length === 0) return null;
  const latest = series[series.length - 1];
  const cutoff = subDays(now, days).getTime();
  const older = [...series].reverse().find((p) => p.x <= cutoff);
  return { latest: latest.y, previous: older?.y, delta: older ? Math.round((latest.y - older.y) * 10) / 10 : undefined };
}

/** Change of a metric within the last `days`, comparing the first and last point in that window. */
export function metricDelta(points: ExercisePoint[], metric: ExerciseMetric, days: number, now = new Date()): number | undefined {
  const cutoff = subDays(now, days).toISOString();
  const inWindow = points.filter((p) => p.date >= cutoff);
  const baseline = [...points].reverse().find((p) => p.date < cutoff) ?? inWindow[0];
  const latest = points[points.length - 1];
  if (!baseline || !latest || baseline === latest) return undefined;
  return Math.round((latest[metric] - baseline[metric]) * 10) / 10;
}
