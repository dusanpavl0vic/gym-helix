import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_PROGRAM_ID } from '@/constants/config';
import { appReset, backupRestored } from '@/store/appActions';
import type { ProgramsState } from '@/types/backup';
import type { PlannedExercise, Program, Workout } from '@/types/domain';
import { createId } from '@/utils/id';

import { createDefaultProgram } from '../data/seedProgram';
import { cloneProgram, createEmptyProgram, createPlannedExercise, moveItem } from '../helpers/programMutations';

const createInitialState = (): ProgramsState => {
  const seed = createDefaultProgram();
  return { programs: { [seed.id]: seed }, order: [seed.id], activeProgramId: seed.id };
};

const touch = (program: Program) => {
  program.updatedAt = new Date().toISOString();
};

type ProgramRef = { programId: string };
type WorkoutRef = ProgramRef & { workoutId: string };
type PlannedRef = WorkoutRef & { plannedId: string };

const findWorkout = (state: ProgramsState, { programId, workoutId }: WorkoutRef) =>
  state.programs[programId]?.workouts.find((w) => w.id === workoutId);

const programsSlice = createSlice({
  name: 'programs',
  initialState: createInitialState,
  reducers: {
    activeProgramSet(state, action: PayloadAction<string>) {
      if (state.programs[action.payload]) state.activeProgramId = action.payload;
    },
    programCreated(state, action: PayloadAction<{ name: string }>) {
      const program = createEmptyProgram(action.payload.name, new Date().toISOString());
      state.programs[program.id] = program;
      state.order.push(program.id);
    },
    programDuplicated(state, action: PayloadAction<ProgramRef & { name: string }>) {
      const source = state.programs[action.payload.programId];
      if (!source) return;
      const copy = cloneProgram(source, action.payload.name, new Date().toISOString());
      state.programs[copy.id] = copy;
      state.order.push(copy.id);
    },
    programDeleted(state, action: PayloadAction<string>) {
      if (state.order.length <= 1) return;
      delete state.programs[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      if (state.activeProgramId === action.payload) state.activeProgramId = state.order[0];
    },
    defaultProgramRestored(state) {
      const seed = createDefaultProgram(DEFAULT_PROGRAM_ID);
      if (!state.order.includes(seed.id)) state.order.unshift(seed.id);
      state.programs[seed.id] = seed;
      state.activeProgramId = seed.id;
    },
    programRenamed(state, action: PayloadAction<ProgramRef & { name: string }>) {
      const program = state.programs[action.payload.programId];
      if (!program) return;
      program.name = action.payload.name;
      delete program.nameKey;
      touch(program);
    },
    workoutAdded(state, action: PayloadAction<ProgramRef & { name: string }>) {
      const program = state.programs[action.payload.programId];
      if (!program) return;
      const workout: Workout = { id: createId('w_'), name: action.payload.name, exercises: [] };
      program.workouts.push(workout);
      program.rotation.push(workout.id);
      touch(program);
    },
    workoutRemoved(state, action: PayloadAction<WorkoutRef>) {
      const program = state.programs[action.payload.programId];
      if (!program) return;
      program.workouts = program.workouts.filter((w) => w.id !== action.payload.workoutId);
      program.rotation = program.rotation.filter((id) => id !== action.payload.workoutId);
      touch(program);
    },
    workoutUpdated(state, action: PayloadAction<WorkoutRef & { name?: string; focus?: string }>) {
      const workout = findWorkout(state, action.payload);
      if (!workout) return;
      if (action.payload.name !== undefined) {
        workout.name = action.payload.name;
        delete workout.nameKey;
      }
      if (action.payload.focus !== undefined) {
        workout.focus = action.payload.focus;
        delete workout.focusKey;
      }
      touch(state.programs[action.payload.programId]);
    },
    rotationMoved(state, action: PayloadAction<ProgramRef & { index: number; direction: -1 | 1 }>) {
      const program = state.programs[action.payload.programId];
      if (!program) return;
      program.rotation = moveItem(program.rotation, action.payload.index, action.payload.direction);
      program.workouts = [...program.workouts].sort(
        (a, b) => program.rotation.indexOf(a.id) - program.rotation.indexOf(b.id),
      );
      touch(program);
    },
    plannedExerciseAdded(state, action: PayloadAction<WorkoutRef & { exerciseId: string; restSec: number }>) {
      const workout = findWorkout(state, action.payload);
      if (!workout) return;
      workout.exercises.push(createPlannedExercise(action.payload.exerciseId, action.payload.restSec));
      touch(state.programs[action.payload.programId]);
    },
    plannedExerciseUpdated(state, action: PayloadAction<PlannedRef & { patch: Partial<Omit<PlannedExercise, 'id'>> }>) {
      const workout = findWorkout(state, action.payload);
      const planned = workout?.exercises.find((e) => e.id === action.payload.plannedId);
      if (!planned) return;
      Object.assign(planned, action.payload.patch);
      if (action.payload.patch.note !== undefined) delete planned.noteKey;
      if (planned.repsMax < planned.repsMin) planned.repsMax = planned.repsMin;
      if (action.payload.patch.restSec !== undefined) delete planned.restSecMax;
      if (action.payload.patch.targetRir !== undefined) delete planned.targetRirMax;
      touch(state.programs[action.payload.programId]);
    },
    plannedExerciseRemoved(state, action: PayloadAction<PlannedRef>) {
      const workout = findWorkout(state, action.payload);
      if (!workout) return;
      workout.exercises = workout.exercises.filter((e) => e.id !== action.payload.plannedId);
      touch(state.programs[action.payload.programId]);
    },
    plannedExerciseMoved(state, action: PayloadAction<WorkoutRef & { index: number; direction: -1 | 1 }>) {
      const workout = findWorkout(state, action.payload);
      if (!workout) return;
      workout.exercises = moveItem(workout.exercises, action.payload.index, action.payload.direction);
      touch(state.programs[action.payload.programId]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(appReset, () => createInitialState())
      .addCase(backupRestored, (_, action) => action.payload.programs);
  },
});

export const {
  activeProgramSet, programCreated, programDuplicated, programDeleted, defaultProgramRestored, programRenamed,
  workoutAdded, workoutRemoved, workoutUpdated, rotationMoved,
  plannedExerciseAdded, plannedExerciseUpdated, plannedExerciseRemoved, plannedExerciseMoved,
} = programsSlice.actions;
export default programsSlice.reducer;
