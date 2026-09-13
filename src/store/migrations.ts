import type { MigrationManifest, PersistedState } from 'redux-persist';

import { DEFAULT_PROGRAM_ID, LEGACY_PROGRAM_IDS } from '@/constants/config';
import { createDefaultProgram } from '@/features/programs/data/seedProgram';
import { initialSettingsState } from '@/features/settings/store/settingsSlice';
import type { BackupPersistedState } from '@/types/backup';
import type { Program, RotationState } from '@/types/domain';

interface LooseState {
  settings?: Partial<Record<keyof BackupPersistedState['settings'], unknown>>;
  programs?: { programs?: Record<string, Program>; order?: string[]; activeProgramId?: string };
  rotation?: { byProgram?: Record<string, Partial<RotationState>> };
  activeSession?: { session?: { programId?: string } | null };
}

const legacyIds = new Set<string>(LEGACY_PROGRAM_IDS);

/**
 * v2: the Upper/Lower 4+1 program replaces Full Body A/B/C, rotation drops the manual deload fields,
 * and new settings get their defaults. Also used for older backup files.
 */
export function migrateToV2<T extends LooseState>(state: T): T {
  const defaultProgram = createDefaultProgram(DEFAULT_PROGRAM_ID);
  const kept = Object.fromEntries(
    Object.entries(state.programs?.programs ?? {}).filter(([id]) => !legacyIds.has(id) && id !== DEFAULT_PROGRAM_ID),
  );
  const order = [defaultProgram.id, ...(state.programs?.order ?? []).filter((id) => id in kept)];
  const previousActive = state.programs?.activeProgramId;
  const activeProgramId = previousActive && previousActive in kept ? previousActive : defaultProgram.id;

  const byProgram = Object.fromEntries(
    Object.entries(state.rotation?.byProgram ?? {})
      .filter(([id]) => !legacyIds.has(id))
      .map(([id, r]): [string, RotationState] => [
        id,
        { programId: id, nextIndex: r.nextIndex ?? 0, lastCompletedAt: r.lastCompletedAt, cycleNumber: r.cycleNumber ?? 1, completedSessions: r.completedSessions ?? 0 },
      ]),
  );

  const session = state.activeSession?.session;

  return {
    ...state,
    settings: { ...initialSettingsState, ...state.settings },
    programs: { programs: { [defaultProgram.id]: defaultProgram, ...kept }, order, activeProgramId },
    rotation: { byProgram },
    activeSession: { session: session && !legacyIds.has(session.programId ?? '') ? session : null },
  };
}

export const migrations: MigrationManifest = {
  2: (state) => (state ? (migrateToV2(state as unknown as LooseState) as unknown as PersistedState) : state),
};
