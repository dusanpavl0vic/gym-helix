import { createAsyncThunk } from '@reduxjs/toolkit';

import { measurementAdded } from '@/features/body/store/bodySlice';
import { rotationJumped, rotationSessionCompleted } from '@/features/plan/store/rotationSlice';
import { selectIsDeloadWeek, selectNextWorkout } from '@/features/plan/store/rotationSelectors';
import { selectActiveProgram } from '@/features/programs/store/programsSelectors';
import { historySessionAdded } from '@/features/progress/store/historySlice';
import type { AppDispatch, RootState } from '@/store';
import { createId } from '@/utils/id';

import { saveSession } from '../db/sessionsRepository';
import { buildActiveExercise, buildActiveSession } from '../helpers/buildActiveSession';
import { toSession } from '../helpers/toSession';
import { exerciseReplaced, sessionClosed, sessionStarted } from './activeSessionSlice';

type ThunkApi = { state: RootState; dispatch: AppDispatch };

export const workoutStarted =
  (params: { workoutId: string; workoutName: string }) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const program = selectActiveProgram(state);
    const workout = program?.workouts.find((w) => w.id === params.workoutId);
    if (!program || !workout) return;

    if (selectNextWorkout(state)?.id !== workout.id) {
      dispatch(rotationJumped({ program, workoutId: workout.id }));
    }

    dispatch(
      sessionStarted(
        buildActiveSession({
          program,
          workout,
          workoutName: params.workoutName,
          isDeload: selectIsDeloadWeek(state),
          sessions: state.history.sessions,
          weightStepKg: state.settings.weightStepKg,
          startedAt: new Date().toISOString(),
        }),
      ),
    );
  };

export const exerciseSubstituted =
  (params: { exerciseIndex: number; exerciseId: string }) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const session = state.activeSession.session;
    const current = session?.exercises[params.exerciseIndex];
    if (!session || !current) return;
    const planned = { ...current.planned, sets: current.sets.length };
    dispatch(
      exerciseReplaced({
        exerciseIndex: params.exerciseIndex,
        exercise: buildActiveExercise(planned, params.exerciseId, false, state.history.sessions, state.settings.weightStepKg),
      }),
    );
  };

export const workoutFinished = createAsyncThunk<string | undefined, { bodyweightKg?: number; notes?: string }, ThunkApi>(
  'workout/finish',
  async (extra, { getState, dispatch }) => {
    const state = getState();
    const active = state.activeSession.session;
    if (!active) return undefined;
    const program = state.programs.programs[active.programId];
    const finishedAt = new Date().toISOString();
    const session = toSession(active, finishedAt, extra);

    await saveSession(session);
    dispatch(historySessionAdded(session));
    dispatch(rotationSessionCompleted({ programId: active.programId, rotationLength: program?.rotation.length ?? 1, completedAt: finishedAt }));
    if (extra.bodyweightKg) {
      await dispatch(measurementAdded({ id: createId('m_'), date: finishedAt, weightKg: extra.bodyweightKg }));
    }
    dispatch(sessionClosed());
    return session.id;
  },
);
