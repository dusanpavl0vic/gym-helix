import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_ATHLETE_NAME, DEFAULT_LANGUAGE, type AppLanguage } from '@/constants/config';
import { DEFAULT_BAR_KG, DEFAULT_PLATES_KG } from '@/constants/plates';
import { REST_SEC_BY_KIND, WEIGHT_STEP_KG } from '@/constants/training';
import { appReset, backupRestored } from '@/store/appActions';
import type { SettingsState } from '@/types/backup';

export const initialSettingsState: SettingsState = {
  athleteName: DEFAULT_ATHLETE_NAME,
  language: DEFAULT_LANGUAGE,
  unit: 'kg',
  restByKind: { ...REST_SEC_BY_KIND },
  weightStepKg: WEIGHT_STEP_KG,
  sound: true,
  vibration: true,
  notifications: true,
  barKg: DEFAULT_BAR_KG,
  plates: [...DEFAULT_PLATES_KG],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialSettingsState,
  reducers: {
    settingsUpdated(state, action: PayloadAction<Partial<SettingsState>>) {
      Object.assign(state, action.payload);
    },
    languageChanged(state, action: PayloadAction<AppLanguage>) {
      state.language = action.payload;
    },
    plateToggled(state, action: PayloadAction<number>) {
      const plate = action.payload;
      state.plates = state.plates.includes(plate)
        ? state.plates.filter((p) => p !== plate)
        : [...state.plates, plate].sort((a, b) => b - a);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(appReset, (state) => ({ ...initialSettingsState, language: state.language, athleteName: state.athleteName }))
      .addCase(backupRestored, (_, action) => ({ ...initialSettingsState, ...action.payload.settings }));
  },
});

export const { settingsUpdated, languageChanged, plateToggled } = settingsSlice.actions;
export default settingsSlice.reducer;
