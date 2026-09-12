import type { RootState } from '@/store';

export const selectMeasurements = (state: RootState) => state.body.measurements;
