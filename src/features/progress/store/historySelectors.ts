import type { RootState } from '@/store';

export const selectSessions = (state: RootState) => state.history.sessions;
export const selectHistoryLoaded = (state: RootState) => state.history.loaded;
export const selectSessionById = (state: RootState, id: string) => state.history.sessions.find((s) => s.id === id);
