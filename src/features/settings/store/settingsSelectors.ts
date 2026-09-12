import type { RootState } from '@/store';

export const selectSettings = (state: RootState) => state.settings;
export const selectLanguage = (state: RootState) => state.settings.language;
export const selectAthleteName = (state: RootState) => state.settings.athleteName;
export const selectUnit = (state: RootState) => state.settings.unit;
