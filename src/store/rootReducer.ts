import { combineReducers } from '@reduxjs/toolkit';

import bodyReducer from '@/features/body/store/bodySlice';
import cardioReducer from '@/features/cardio/store/cardioSlice';
import exercisesReducer from '@/features/exercises/store/exercisesSlice';
import rotationReducer from '@/features/plan/store/rotationSlice';
import programsReducer from '@/features/programs/store/programsSlice';
import historyReducer from '@/features/progress/store/historySlice';
import settingsReducer from '@/features/settings/store/settingsSlice';
import activeSessionReducer from '@/features/workout/store/activeSessionSlice';

export const rootReducer = combineReducers({
  settings: settingsReducer,
  programs: programsReducer,
  rotation: rotationReducer,
  exercises: exercisesReducer,
  activeSession: activeSessionReducer,
  history: historyReducer,
  body: bodyReducer,
  cardio: cardioReducer,
});

export type RootReducerState = ReturnType<typeof rootReducer>;
