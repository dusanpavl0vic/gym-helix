import { DEFAULT_PROGRAM_ID } from '@/constants/config';

import { migrateToV2 } from '../migrations';

const legacyState = {
  exercises: { custom: {} },
  settings: { athleteName: 'Dušan', language: 'sr', countdownTicks: true },
  programs: {
    programs: {
      'recomp-fb-abc': { id: 'recomp-fb-abc', workouts: [], rotation: ['FB_A'], createdAt: '', updatedAt: '' },
      p_copy: { id: 'p_copy', name: 'Moj', workouts: [], rotation: [], createdAt: '', updatedAt: '' },
    },
    order: ['recomp-fb-abc', 'p_copy'],
    activeProgramId: 'recomp-fb-abc',
  },
  rotation: {
    byProgram: {
      'recomp-fb-abc': { programId: 'recomp-fb-abc', nextIndex: 5, cycleNumber: 2, completedSessions: 5, deloadActive: false },
      p_copy: { programId: 'p_copy', nextIndex: 2, cycleNumber: 1, completedSessions: 2, sessionsSinceDeload: 2 },
    },
  },
  activeSession: { session: { programId: 'recomp-fb-abc' } },
  history: { sessions: [{ id: 's1' }] },
};

describe('migrateToV2', () => {
  const migrated = migrateToV2(legacyState);
  const programs = migrated.programs!;
  const rotation = migrated.rotation!;

  it('replaces the legacy program with the new default and activates it', () => {
    expect(programs.order).toEqual([DEFAULT_PROGRAM_ID, 'p_copy']);
    expect(Object.keys(programs.programs ?? {})).not.toContain('recomp-fb-abc');
    expect(programs.activeProgramId).toBe(DEFAULT_PROGRAM_ID);
  });

  it('keeps an active custom program', () => {
    const state = migrateToV2({ ...legacyState, programs: { ...legacyState.programs, activeProgramId: 'p_copy' } });
    expect(state.programs?.activeProgramId).toBe('p_copy');
  });

  it('cleans rotation, closes a legacy session and fills new settings', () => {
    expect(Object.keys(rotation.byProgram ?? {})).toEqual(['p_copy']);
    expect(rotation.byProgram?.p_copy).toEqual({ programId: 'p_copy', nextIndex: 2, lastCompletedAt: undefined, cycleNumber: 1, completedSessions: 2 });
    expect(migrated.activeSession?.session).toBeNull();
    expect(migrated.settings).toMatchObject({ athleteName: 'Dušan', countdownTicks: true, restWarning: true });
    expect(migrated.history).toEqual({ sessions: [{ id: 's1' }] });
  });
});
