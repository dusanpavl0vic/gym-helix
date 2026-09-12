import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { deleteSession, loadSessions } from '@/features/workout/db/sessionsRepository';
import { appReset } from '@/store/appActions';
import type { Session } from '@/types/domain';

interface HistoryState {
  sessions: Session[];
  loaded: boolean;
}

const initialState: HistoryState = { sessions: [], loaded: false };

export const historyLoaded = createAsyncThunk('history/load', () => loadSessions());

export const historySessionDeleted = createAsyncThunk('history/delete', async (id: string) => {
  await deleteSession(id);
  return id;
});

const byStartedDesc = (a: Session, b: Session) => b.startedAt.localeCompare(a.startedAt);

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    historySessionAdded(state, action: PayloadAction<Session>) {
      state.sessions = [action.payload, ...state.sessions.filter((s) => s.id !== action.payload.id)].sort(byStartedDesc);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(historyLoaded.fulfilled, (state, action) => {
        state.sessions = action.payload;
        state.loaded = true;
      })
      .addCase(historyLoaded.rejected, (state) => {
        state.loaded = true;
      })
      .addCase(historySessionDeleted.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter((s) => s.id !== action.payload);
      })
      .addCase(appReset, () => ({ sessions: [], loaded: true }));
  },
});

export const { historySessionAdded } = historySlice.actions;
export default historySlice.reducer;
