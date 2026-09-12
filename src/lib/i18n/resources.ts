import enBackup from './locales/en/backup.json';
import enBody from './locales/en/body.json';
import enCardio from './locales/en/cardio.json';
import enCommon from './locales/en/common.json';
import enExercises from './locales/en/exercises.json';
import enHome from './locales/en/home.json';
import enPlan from './locales/en/plan.json';
import enPlates from './locales/en/plates.json';
import enPrograms from './locales/en/programs.json';
import enProgress from './locales/en/progress.json';
import enSettings from './locales/en/settings.json';
import enWorkout from './locales/en/workout.json';
import srBackup from './locales/sr/backup.json';
import srBody from './locales/sr/body.json';
import srCardio from './locales/sr/cardio.json';
import srCommon from './locales/sr/common.json';
import srExercises from './locales/sr/exercises.json';
import srHome from './locales/sr/home.json';
import srPlan from './locales/sr/plan.json';
import srPlates from './locales/sr/plates.json';
import srPrograms from './locales/sr/programs.json';
import srProgress from './locales/sr/progress.json';
import srSettings from './locales/sr/settings.json';
import srWorkout from './locales/sr/workout.json';

export const NAMESPACES = [
  'common', 'home', 'plan', 'programs', 'workout', 'exercises',
  'progress', 'body', 'cardio', 'plates', 'backup', 'settings',
] as const;

export type Namespace = (typeof NAMESPACES)[number];

export const resources = {
  sr: {
    common: srCommon, home: srHome, plan: srPlan, programs: srPrograms, workout: srWorkout, exercises: srExercises,
    progress: srProgress, body: srBody, cardio: srCardio, plates: srPlates, backup: srBackup, settings: srSettings,
  },
  en: {
    common: enCommon, home: enHome, plan: enPlan, programs: enPrograms, workout: enWorkout, exercises: enExercises,
    progress: enProgress, body: enBody, cardio: enCardio, plates: enPlates, backup: enBackup, settings: enSettings,
  },
} as const;
