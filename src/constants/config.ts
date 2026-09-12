export const APP_NAME = 'GymPersonal';
export const DEFAULT_LANGUAGE = 'sr';
export const SUPPORTED_LANGUAGES = ['sr', 'en'] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_ATHLETE_NAME = 'Dušan';
export const DEFAULT_PROGRAM_ID = 'recomp-fb-abc';
