import type { ExerciseKind } from '@/constants/training';
import type { MuscleGroup } from '@/types/domain';

export interface CatalogEntry {
  id: string;
  nameEn: string;
  /** Folder name in free-exercise-db when the English name does not match exactly. */
  sourceId?: string;
  kind: ExerciseKind;
  equipment: string;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
}

export const CATALOG: CatalogEntry[] = [
  // Full Body A
  { id: 'legPress', nameEn: 'Leg Press', kind: 'heavyCompound', equipment: 'machine', primaryMuscles: ['quads'], secondaryMuscles: ['glutes', 'hamstrings'] },
  { id: 'dumbbellBenchPress', nameEn: 'Dumbbell Bench Press', kind: 'heavyCompound', equipment: 'dumbbell', primaryMuscles: ['chest'], secondaryMuscles: ['triceps', 'shoulders'] },
  { id: 'wideGripLatPulldown', nameEn: 'Wide-Grip Lat Pulldown', kind: 'machine', equipment: 'cable', primaryMuscles: ['back'], secondaryMuscles: ['biceps'] },
  { id: 'romanianDeadlift', nameEn: 'Romanian Deadlift', kind: 'heavyCompound', equipment: 'barbell', primaryMuscles: ['hamstrings'], secondaryMuscles: ['glutes', 'back'] },
  { id: 'sideLateralRaise', nameEn: 'Side Lateral Raise', kind: 'isolation', equipment: 'dumbbell', primaryMuscles: ['shoulders'], secondaryMuscles: [] },
  { id: 'tricepsPushdown', nameEn: 'Triceps Pushdown', sourceId: 'Triceps_Pushdown_-_Rope_Attachment', kind: 'isolation', equipment: 'cable', primaryMuscles: ['triceps'], secondaryMuscles: [] },
  { id: 'cableCrunch', nameEn: 'Cable Crunch', kind: 'isolation', equipment: 'cable', primaryMuscles: ['core'], secondaryMuscles: [] },
  // Full Body B
  { id: 'trapBarDeadlift', nameEn: 'Trap Bar Deadlift', kind: 'heavyCompound', equipment: 'trap bar', primaryMuscles: ['quads', 'glutes'], secondaryMuscles: ['hamstrings', 'back'] },
  { id: 'chestSupportedDumbbellRow', nameEn: 'Chest Supported Dumbbell Row', sourceId: 'Dumbbell_Incline_Row', kind: 'heavyCompound', equipment: 'dumbbell', primaryMuscles: ['back'], secondaryMuscles: ['biceps', 'shoulders'] },
  { id: 'seatedDumbbellShoulderPress', nameEn: 'Seated Dumbbell Shoulder Press', sourceId: 'Dumbbell_Shoulder_Press', kind: 'machine', equipment: 'dumbbell', primaryMuscles: ['shoulders'], secondaryMuscles: ['triceps'] },
  { id: 'lyingLegCurl', nameEn: 'Lying Leg Curl', sourceId: 'Lying_Leg_Curls', kind: 'isolation', equipment: 'machine', primaryMuscles: ['hamstrings'], secondaryMuscles: ['calves'] },
  { id: 'machineChestPress', nameEn: 'Machine Chest Press', sourceId: 'Leverage_Chest_Press', kind: 'machine', equipment: 'machine', primaryMuscles: ['chest'], secondaryMuscles: ['triceps', 'shoulders'] },
  { id: 'inclineDumbbellCurl', nameEn: 'Incline Dumbbell Curl', kind: 'isolation', equipment: 'dumbbell', primaryMuscles: ['biceps'], secondaryMuscles: [] },
  { id: 'facePull', nameEn: 'Face Pull', kind: 'isolation', equipment: 'cable', primaryMuscles: ['shoulders'], secondaryMuscles: ['back'] },
  // Full Body C
  { id: 'bulgarianSplitSquat', nameEn: 'Bulgarian Split Squat', sourceId: 'Split_Squat_with_Dumbbells', kind: 'machine', equipment: 'dumbbell', primaryMuscles: ['quads', 'glutes'], secondaryMuscles: ['hamstrings'] },
  { id: 'inclineDumbbellPress', nameEn: 'Incline Dumbbell Press', kind: 'heavyCompound', equipment: 'dumbbell', primaryMuscles: ['chest'], secondaryMuscles: ['shoulders', 'triceps'] },
  { id: 'neutralGripPulldown', nameEn: 'Neutral Grip Pulldown', sourceId: 'V-Bar_Pulldown', kind: 'machine', equipment: 'cable', primaryMuscles: ['back'], secondaryMuscles: ['biceps'] },
  { id: 'legExtension', nameEn: 'Leg Extension', sourceId: 'Leg_Extensions', kind: 'isolation', equipment: 'machine', primaryMuscles: ['quads'], secondaryMuscles: [] },
  { id: 'cableCrossover', nameEn: 'Cable Crossover', kind: 'isolation', equipment: 'cable', primaryMuscles: ['chest'], secondaryMuscles: ['shoulders'] },
  { id: 'cableLateralRaise', nameEn: 'Cable Lateral Raise', sourceId: 'Cable_Seated_Lateral_Raise', kind: 'isolation', equipment: 'cable', primaryMuscles: ['shoulders'], secondaryMuscles: [] },
  { id: 'standingCalfRaise', nameEn: 'Standing Calf Raise', sourceId: 'Standing_Calf_Raises', kind: 'isolation', equipment: 'machine', primaryMuscles: ['calves'], secondaryMuscles: [] },
  { id: 'hangingKneeRaise', nameEn: 'Hanging Knee Raise', sourceId: 'Hanging_Leg_Raise', kind: 'isolation', equipment: 'body only', primaryMuscles: ['core'], secondaryMuscles: [] },
  // Alternatives
  { id: 'hackSquat', nameEn: 'Hack Squat', kind: 'heavyCompound', equipment: 'machine', primaryMuscles: ['quads'], secondaryMuscles: ['glutes'] },
  { id: 'gobletSquat', nameEn: 'Goblet Squat', kind: 'machine', equipment: 'dumbbell', primaryMuscles: ['quads'], secondaryMuscles: ['glutes', 'core'] },
  { id: 'assistedPullUp', nameEn: 'Assisted Pull-Up', sourceId: 'Band_Assisted_Pull-Up', kind: 'machine', equipment: 'machine', primaryMuscles: ['back'], secondaryMuscles: ['biceps'] },
  { id: 'hipThrust', nameEn: 'Hip Thrust', sourceId: 'Barbell_Hip_Thrust', kind: 'heavyCompound', equipment: 'barbell', primaryMuscles: ['glutes'], secondaryMuscles: ['hamstrings'] },
  { id: 'dumbbellDeadlift', nameEn: 'Dumbbell Deadlift', sourceId: 'Stiff-Legged_Dumbbell_Deadlift', kind: 'heavyCompound', equipment: 'dumbbell', primaryMuscles: ['hamstrings'], secondaryMuscles: ['glutes', 'back'] },
  { id: 'walkingLunge', nameEn: 'Walking Lunge', sourceId: 'Bodyweight_Walking_Lunge', kind: 'machine', equipment: 'dumbbell', primaryMuscles: ['quads', 'glutes'], secondaryMuscles: ['hamstrings'] },
  { id: 'narrowStanceLegPress', nameEn: 'Narrow Stance Leg Press', kind: 'heavyCompound', equipment: 'machine', primaryMuscles: ['quads'], secondaryMuscles: ['glutes'] },
  { id: 'plank', nameEn: 'Plank', kind: 'isolation', equipment: 'body only', primaryMuscles: ['core'], secondaryMuscles: [] },
];
