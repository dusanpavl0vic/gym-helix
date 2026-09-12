import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { appReset } from '@/store/appActions';
import type { CardioSession } from '@/types/domain';

import { deleteCardio, loadCardio, saveCardio } from '../db/cardioRepository';

interface CardioState {
  entries: CardioSession[];
  loaded: boolean;
}

const initialState: CardioState = { entries: [], loaded: false };

export const cardioLoaded = createAsyncThunk('cardio/load', () => loadCardio());
export const cardioAdded = createAsyncThunk('cardio/add', async (entry: CardioSession) => {
  await saveCardio([entry]);
  return entry;
});
export const cardioRemoved = createAsyncThunk('cardio/remove', async (id: string) => {
  await deleteCardio(id);
  return id;
});

const cardioSlice = createSlice({
  name: 'cardio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cardioLoaded.fulfilled, (state, action) => {
        state.entries = action.payload;
        state.loaded = true;
      })
      .addCase(cardioAdded.fulfilled, (state, action) => {
        state.entries = [action.payload, ...state.entries].sort((a, b) => b.date.localeCompare(a.date));
      })
      .addCase(cardioRemoved.fulfilled, (state, action) => {
        state.entries = state.entries.filter((e) => e.id !== action.payload);
      })
      .addCase(appReset, () => ({ entries: [], loaded: true }));
  },
});

export default cardioSlice.reducer;
