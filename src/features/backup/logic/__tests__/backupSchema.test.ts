import { isBackupFile } from '../backupSchema';

const valid = {
  app: 'gym-personal', version: 1, exportedAt: '2026-09-12',
  state: { settings: {}, programs: { programs: {}, order: [], activeProgramId: '' }, rotation: { byProgram: {} }, exercises: { custom: {} } },
  sessions: [], cardio: [], body: [],
};

describe('isBackupFile', () => {
  it('accepts a valid backup', () => expect(isBackupFile(valid)).toBe(true));
  it('rejects other JSON', () => {
    expect(isBackupFile({})).toBe(false);
    expect(isBackupFile({ ...valid, app: 'other' })).toBe(false);
    expect(isBackupFile({ ...valid, sessions: null })).toBe(false);
  });
});
