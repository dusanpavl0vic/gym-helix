import { DEFAULT_PROGRAM_ID } from '@/constants/config';
import type { PlannedExercise, Program } from '@/types/domain';

type SeedRow = Omit<PlannedExercise, 'id'>;

const row = (workoutId: string, index: number, data: SeedRow): PlannedExercise => ({
  id: `${workoutId}-${index + 1}`,
  ...data,
});

const build = (workoutId: string, rows: SeedRow[]) => rows.map((r, i) => row(workoutId, i, r));

const SEED_DATE = '2026-01-01T00:00:00.000Z';

export function createSeedProgram(id: string = DEFAULT_PROGRAM_ID): Program {
  return {
    id,
    nameKey: 'programs:seed.name',
    isDefault: true,
    rotation: ['FB_A', 'FB_B', 'FB_C'],
    createdAt: SEED_DATE,
    updatedAt: SEED_DATE,
    workouts: [
      {
        id: 'FB_A',
        nameKey: 'programs:seed.workouts.FB_A.name',
        focusKey: 'programs:seed.workouts.FB_A.focus',
        exercises: build('FB_A', [
          { exerciseId: 'legPress', sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 120, restSecMax: 180, alternativeIds: ['hackSquat', 'gobletSquat'] },
          { exerciseId: 'dumbbellBenchPress', sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 120, restSecMax: 180 },
          { exerciseId: 'wideGripLatPulldown', sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 120, alternativeIds: ['assistedPullUp'] },
          { exerciseId: 'romanianDeadlift', sets: 2, repsMin: 8, repsMax: 10, targetRir: 3, restSec: 120, noteKey: 'programs:seed.notes.neverToFailure' },
          { exerciseId: 'sideLateralRaise', sets: 3, repsMin: 12, repsMax: 20, targetRir: 0, targetRirMax: 1, restSec: 60, restSecMax: 90 },
          { exerciseId: 'tricepsPushdown', sets: 2, repsMin: 10, repsMax: 15, targetRir: 0, targetRirMax: 1, restSec: 60, restSecMax: 90 },
          { exerciseId: 'cableCrunch', sets: 3, repsMin: 10, repsMax: 15, targetRir: 1, restSec: 60 },
        ]),
      },
      {
        id: 'FB_B',
        nameKey: 'programs:seed.workouts.FB_B.name',
        focusKey: 'programs:seed.workouts.FB_B.focus',
        exercises: build('FB_B', [
          { exerciseId: 'trapBarDeadlift', sets: 3, repsMin: 5, repsMax: 8, targetRir: 2, targetRirMax: 3, restSec: 180, noteKey: 'programs:seed.notes.trapBar', alternativeIds: ['hipThrust', 'dumbbellDeadlift'] },
          { exerciseId: 'chestSupportedDumbbellRow', sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 120 },
          { exerciseId: 'seatedDumbbellShoulderPress', sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 120 },
          { exerciseId: 'lyingLegCurl', sets: 3, repsMin: 10, repsMax: 15, targetRir: 0, targetRirMax: 1, restSec: 90 },
          { exerciseId: 'machineChestPress', sets: 2, repsMin: 10, repsMax: 15, targetRir: 1, restSec: 90 },
          { exerciseId: 'inclineDumbbellCurl', sets: 3, repsMin: 10, repsMax: 15, targetRir: 0, targetRirMax: 1, restSec: 60, restSecMax: 90 },
          { exerciseId: 'facePull', sets: 2, repsMin: 15, repsMax: 20, targetRir: 1, restSec: 60 },
        ]),
      },
      {
        id: 'FB_C',
        nameKey: 'programs:seed.workouts.FB_C.name',
        focusKey: 'programs:seed.workouts.FB_C.focus',
        exercises: build('FB_C', [
          { exerciseId: 'bulgarianSplitSquat', sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 120, perSide: true, alternativeIds: ['narrowStanceLegPress', 'walkingLunge'] },
          { exerciseId: 'inclineDumbbellPress', sets: 3, repsMin: 8, repsMax: 12, targetRir: 2, restSec: 120, restSecMax: 180 },
          { exerciseId: 'neutralGripPulldown', sets: 3, repsMin: 6, repsMax: 12, targetRir: 2, restSec: 120, alternativeIds: ['assistedPullUp'] },
          { exerciseId: 'legExtension', sets: 3, repsMin: 12, repsMax: 15, targetRir: 0, targetRirMax: 1, restSec: 90 },
          { exerciseId: 'cableCrossover', sets: 2, repsMin: 12, repsMax: 15, targetRir: 0, targetRirMax: 1, restSec: 60, restSecMax: 90 },
          { exerciseId: 'cableLateralRaise', sets: 3, repsMin: 12, repsMax: 20, targetRir: 0, targetRirMax: 1, restSec: 60, restSecMax: 90 },
          { exerciseId: 'standingCalfRaise', sets: 3, repsMin: 10, repsMax: 15, targetRir: 1, restSec: 60, restSecMax: 90 },
          { exerciseId: 'hangingKneeRaise', sets: 3, repsMin: 10, repsMax: 15, targetRir: 1, restSec: 60, alternativeIds: ['plank'] },
        ]),
      },
    ],
  };
}
