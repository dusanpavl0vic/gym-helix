import { useRouter } from 'expo-router';
import { useState } from 'react';

import { selectSettings } from '@/features/settings/store/settingsSelectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { settingsUpdated } from '@/features/settings/store/settingsSlice';

import { calculatePlates } from '../logic/plates';

const DEFAULT_TARGET = 60;

export function usePlateCalculator() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const [targetKg, setTargetKg] = useState(DEFAULT_TARGET);
  const result = calculatePlates(targetKg, settings.barKg, settings.plates);

  return {
    targetKg,
    setTargetKg,
    barKg: settings.barKg,
    setBarKg: (barKg: number) => dispatch(settingsUpdated({ barKg })),
    result,
    back: () => router.back(),
  };
}
