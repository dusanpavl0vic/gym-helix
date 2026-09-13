export const APP_NAME = 'Helix';
export const DEFAULT_LANGUAGE = 'sr';
export const SUPPORTED_LANGUAGES = ['sr', 'en'] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_ATHLETE_NAME = 'Dušan';
export const DEFAULT_PROGRAM_ID = 'recomp-upper-lower-4-1';
/** Programs from earlier versions that migrations remove. */
export const LEGACY_PROGRAM_IDS = ['recomp-fb-abc'] as const;
