import { createListenerMiddleware } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

import { languageChanged } from '@/features/settings/store/settingsSlice';
import { setAppLanguage } from '@/lib/i18n';

import type { RootReducerState } from './rootReducer';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: languageChanged,
  effect: (action) => setAppLanguage(action.payload),
});

listenerMiddleware.startListening({
  predicate: (action) => action.type === REHYDRATE || action.type === 'app/backupRestored',
  effect: (_, api) => setAppLanguage((api.getState() as RootReducerState).settings.language),
});
