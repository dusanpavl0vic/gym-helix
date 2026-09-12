import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { appReset } from '@/store/appActions';
import type { BodyMeasurement } from '@/types/domain';

import { deleteMeasurement, loadMeasurements, saveMeasurements } from '../db/bodyRepository';

interface BodyState {
  measurements: BodyMeasurement[];
  loaded: boolean;
}

const initialState: BodyState = { measurements: [], loaded: false };

export const bodyLoaded = createAsyncThunk('body/load', () => loadMeasurements());
export const measurementAdded = createAsyncThunk('body/add', async (m: BodyMeasurement) => {
  await saveMeasurements([m]);
  return m;
});
export const measurementRemoved = createAsyncThunk('body/remove', async (id: string) => {
  await deleteMeasurement(id);
  return id;
});

const bodySlice = createSlice({
  name: 'body',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bodyLoaded.fulfilled, (state, action) => {
        state.measurements = action.payload;
        state.loaded = true;
      })
      .addCase(measurementAdded.fulfilled, (state, action) => {
        state.measurements = [action.payload, ...state.measurements.filter((m) => m.id !== action.payload.id)]
          .sort((a, b) => b.date.localeCompare(a.date));
      })
      .addCase(measurementRemoved.fulfilled, (state, action) => {
        state.measurements = state.measurements.filter((m) => m.id !== action.payload);
      })
      .addCase(appReset, () => ({ measurements: [], loaded: true }));
  },
});

export default bodySlice.reducer;
