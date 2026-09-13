import { CATALOG } from '@/features/exercises/data/catalog.data';

import { createDefaultProgram } from '../seedProgram';

describe('default program', () => {
  const program = createDefaultProgram();
  const exercises = program.workouts.flatMap((w) => w.exercises);

  it('rotates four strength days', () => {
    expect(program.rotation).toEqual(['UPPER_A', 'LOWER_A', 'UPPER_B', 'LOWER_B']);
    expect(program.workouts.map((w) => w.exercises.length)).toEqual([7, 6, 6, 6]);
    expect(program.weekPlan).toHaveLength(7);
  });

  it('only references exercises from the catalog', () => {
    const ids = new Set(CATALOG.map((e) => e.id));
    const referenced = exercises.flatMap((e) => [e.exerciseId, ...(e.alternativeIds ?? [])]);
    expect(referenced.filter((id) => !ids.has(id))).toEqual([]);
  });

  it('uses unique planned exercise ids', () => {
    expect(new Set(exercises.map((e) => e.id)).size).toBe(exercises.length);
  });
});
