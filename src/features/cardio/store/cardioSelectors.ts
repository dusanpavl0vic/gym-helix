import type { RootState } from '@/store';

export const selectCardioEntries = (state: RootState) => state.cardio.entries;
