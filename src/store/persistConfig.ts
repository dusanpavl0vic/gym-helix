import type { PersistConfig } from 'redux-persist';

import { PERSIST_KEY, PERSIST_VERSION } from '@/constants/storage';
import { persistStorage } from '@/lib/storage/asyncStorage';

import type { RootReducerState } from './rootReducer';

export const persistConfig: PersistConfig<RootReducerState> = {
  key: PERSIST_KEY,
  version: PERSIST_VERSION,
  storage: persistStorage,
  whitelist: ['settings', 'programs', 'rotation', 'exercises', 'activeSession'],
};
