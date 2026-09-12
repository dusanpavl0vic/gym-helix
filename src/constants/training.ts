export type ExerciseKind = 'heavyCompound' | 'machine' | 'isolation';

export const REST_SEC_BY_KIND: Record<ExerciseKind, number> = {
  heavyCompound: 150,
  machine: 105,
  isolation: 75,
};

export const TARGET_RIR_BY_KIND: Record<ExerciseKind, number> = {
  heavyCompound: 2,
  machine: 1,
  isolation: 0,
};

export const WEIGHT_INCREMENT_KG = { upper: 2.5, lower: 5 } as const;
export const WEIGHT_STEP_KG = 2.5;
export const REPS_STEP = 1;
export const RIR_OPTIONS = [0, 1, 2, 3, 4, 5] as const;

export const DELOAD = {
  afterCycles: 6,
  maxSets: 2,
  targetRir: 4,
} as const;

export const DEFAULT_SET_SEC = 45;
export const WARMUP_MIN = 8;
export const HOME_HISTORY_LIMIT = 3;
export const WEEK_DAYS = 7;
export const VOLUME_WEEKS = 6;
export const PROGRESS_DELTA_DAYS = 30;
export const BODY_COMPARE_DAYS = 28;
