import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE, type AppLanguage } from '@/constants/config';

import { NAMESPACES, resources } from './resources';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    ns: [...NAMESPACES],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    returnNull: false,
  });
}

export function setAppLanguage(language: AppLanguage) {
  if (i18n.language !== language) {
    i18n.changeLanguage(language);
  }
}

export { NAMESPACES };
export default i18n;
