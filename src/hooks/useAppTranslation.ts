import { useTranslation } from 'react-i18next';

import type { Namespace } from '@/lib/i18n/resources';

export function useAppTranslation(ns: Namespace | Namespace[] = 'common') {
  return useTranslation(ns);
}
