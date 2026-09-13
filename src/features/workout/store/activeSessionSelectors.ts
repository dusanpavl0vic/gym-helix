import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/store';

import { isSessionComplete } from '../helpers/position';

export const selectActiveSession = (state: RootState) => state.activeSession.session;
export const selectHasActiveSession = (state: RootState) => state.activeSession.session !== null;
export const selectRest = (state: RootState) => state.activeSession.session?.rest ?? null;

export const selectIsActiveSessionComplete = createSelector(selectActiveSession, (session) =>
  session ? isSessionComplete(session.exercises) : false,
);
