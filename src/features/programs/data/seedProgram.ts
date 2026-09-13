import { DEFAULT_PROGRAM_ID } from '@/constants/config';
import type { PlannedExercise, Program, WeekPlanDay } from '@/types/domain';

type SeedRow = Omit<PlannedExercise, 'id'>;

const build = (workoutId: string, rows: SeedRow[]): PlannedExercise[] =>
  rows.map((row, index) => ({ id: `${workoutId}-${index + 1}`, ...row }));

export const DEFAULT_WORKOUT_IDS = {
  upperA: 'UPPER_A',
  lowerA: 'LOWER_A',
  upperB: 'UPPER_B',
  lowerB: 'LOWER_B',
} as const;

const W = DEFAULT_WORKOUT_IDS;
const SEED_DATE = '2026-09-13T00:00:00.000Z';

const WEEK_PLAN: WeekPlanDay[] = [
  { weekday: 1, kind: 'strength', workoutId: W.upperA },
  { weekday: 2, kind: 'strength', workoutId: W.lowerA },
  { weekday: 3, kind: 'rest', noteKey: 'programs:seed.week.rest' },
  { weekday: 4, kind: 'strength', workoutId: W.upperB },
  { weekday: 5, kind: 'rest', noteKey: 'programs:seed.week.rest' },
  { weekday: 6, kind: 'strength', workoutId: W.lowerB },
  { weekday: 7, kind: 'cardio', noteKey: 'programs:seed.week.cardio' },
];

/** Recomp — Upper/Lower 4+1 (ironlog-program-spec.md). Workouts rotate in order; the week plan is a suggestion. */
export function createDefaultProgram(id: string = DEFAULT_PROGRAM_ID): Program {
  return {
    id,
    nameKey: 'programs:seed.name',
    goalKey: 'programs:seed.goal',
    isDefault: true,
    rotation: [W.upperA, W.lowerA, W.upperB, W.lowerB],
    weekPlan: WEEK_PLAN,
    createdAt: SEED_DATE,
    updatedAt: SEED_DATE,
    workouts: [
      {
        id: W.upperA,
        nameKey: 'programs:seed.workouts.UPPER_A.name',
        focusKey: 'programs:seed.workouts.UPPER_A.focus',
        exercises: build(W.upperA, [
          { exerciseId: 'inclineDumbbellPress', sets: 4, repsMin: 6, repsMax: 10, targetRir: 2, restSec: 180, noteKey: 'programs:seed.notes.bench30' },
          { exerciseId: 'chestSupportedDumbbellRow', sets: 4, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 150 },
          { exerciseId: 'seatedDumbbellShoulderPress', sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 150 },
          { exerciseId: 'latPulldown', sets: 3, repsMin: 10, repsMax: 12, targetRir: 2, restSec: 120 },
          { exerciseId: 'cableLateralRaise', sets: 3, repsMin: 12, repsMax: 20, targetRir: 0, targetRirMax: 1, restSec: 60 },
          { exerciseId: 'tricepsPushdown', sets: 3, repsMin: 10, repsMax: 15, targetRir: 2, restSec: 60 },
          { exerciseId: 'facePull', sets: 3, repsMin: 15, repsMax: 20, targetRir: 0, targetRirMax: 1, restSec: 60 },
        ]),
      },
      {
        id: W.lowerA,
        nameKey: 'programs:seed.workouts.LOWER_A.name',
        focusKey: 'programs:seed.workouts.LOWER_A.focus',
        exercises: build(W.lowerA, [
          { exerciseId: 'hackSquat', sets: 4, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 180, alternativeIds: ['legPress'] },
          { exerciseId: 'romanianDeadlift', sets: 3, repsMin: 8, repsMax: 10, targetRir: 2, restSec: 180 },
          { exerciseId: 'bulgarianSplitSquat', sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 120, perSide: true },
          { exerciseId: 'legExtension', sets: 3, repsMin: 12, repsMax: 15, targetRir: 0, targetRirMax: 1, restSec: 90 },
          { exerciseId: 'standingCalfRaise', sets: 4, repsMin: 10, repsMax: 15, targetRir: 2, restSec: 90, noteKey: 'programs:seed.notes.calfPause' },
          { exerciseId: 'hangingLegRaise', sets: 3, repsMin: 10, repsMax: 15, targetRir: 2, restSec: 90, progression: 'none' },
        ]),
      },
      {
        id: W.upperB,
        nameKey: 'programs:seed.workouts.UPPER_B.name',
        focusKey: 'programs:seed.workouts.UPPER_B.focus',
        exercises: build(W.upperB, [
          { exerciseId: 'pullUp', sets: 4, repsMin: 6, repsMax: 10, targetRir: 2, restSec: 180, noteKey: 'programs:seed.notes.pullUpWeighted', alternativeIds: ['latPulldown'] },
          { exerciseId: 'dumbbellBenchPress', sets: 4, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 180 },
          { exerciseId: 'seatedCableRow', sets: 3, repsMin: 10, repsMax: 12, targetRir: 2, restSec: 150 },
          { exerciseId: 'inclineDumbbellCurl', sets: 3, repsMin: 10, repsMax: 12, targetRir: 2, restSec: 90 },
          { exerciseId: 'overheadCableTricepsExtension', sets: 3, repsMin: 10, repsMax: 15, targetRir: 2, restSec: 90 },
          { exerciseId: 'sideLateralRaise', sets: 3, repsMin: 12, repsMax: 20, targetRir: 0, targetRirMax: 1, restSec: 60 },
        ]),
      },
      {
        id: W.lowerB,
        nameKey: 'programs:seed.workouts.LOWER_B.name',
        focusKey: 'programs:seed.workouts.LOWER_B.focus',
        exercises: build(W.lowerB, [
          { exerciseId: 'trapBarDeadlift', sets: 4, repsMin: 5, repsMax: 8, targetRir: 2, targetRirMax: 3, restSec: 210 },
          { exerciseId: 'legPress', sets: 3, repsMin: 10, repsMax: 15, targetRir: 2, restSec: 150 },
          { exerciseId: 'seatedLegCurl', sets: 4, repsMin: 10, repsMax: 15, targetRir: 0, targetRirMax: 1, restSec: 90 },
          { exerciseId: 'hipThrust', sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 120 },
          { exerciseId: 'seatedCalfRaise', sets: 3, repsMin: 12, repsMax: 20, targetRir: 2, restSec: 60 },
          { exerciseId: 'cableCrunch', sets: 3, repsMin: 12, repsMax: 15, targetRir: 2, restSec: 60 },
        ]),
      },
    ],
  };
}
