import type { BodyMeasurement, CardioSession, Exercise, Program, RotationState, Session } from './domain';

export type RestSoundMode = 'app' | 'system' | 'off';

export interface SettingsState {
  athleteName: string;
  language: 'sr' | 'en';
  unit: 'kg' | 'lb';
  restByKind: { heavyCompound: number; machine: number; isolation: number };
  weightStepKg: number;
  restSound: RestSoundMode;
  countdownTicks: boolean;
  /** Sound and haptic when 10 seconds of rest are left. */
  restWarning: boolean;
  /** Whether the in-app notifications permission dialog was already shown. */
  notificationsPrompted: boolean;
  vibration: boolean;
  notifications: boolean;
  barKg: number;
  plates: number[];
}

export interface ProgramsState {
  programs: Record<string, Program>;
  order: string[];
  activeProgramId: string;
}

export interface RotationSliceState {
  byProgram: Record<string, RotationState>;
}

export interface CustomExercisesState {
  custom: Record<string, Exercise>;
}

export interface BackupPersistedState {
  settings: SettingsState;
  programs: ProgramsState;
  rotation: RotationSliceState;
  exercises: CustomExercisesState;
}

export interface BackupFile {
  app: string;
  version: number;
  exportedAt: string;
  state: BackupPersistedState;
  sessions: Session[];
  cardio: CardioSession[];
  body: BodyMeasurement[];
}
