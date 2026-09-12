import { NAMESPACES, resources } from '../resources';

const flatten = (obj: unknown, prefix = ''): string[] => {
  if (Array.isArray(obj)) return [`${prefix}[]`];
  if (obj && typeof obj === 'object') {
    return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
};

// Plural suffixes differ between languages (sr: one/few/other, en: one/other).
const basePlural = (key: string) => key.replace(/_(one|few|other)$/, '');

describe('locales', () => {
  it.each(NAMESPACES)('sr and en have the same keys in %s', (ns) => {
    const sr = new Set(flatten(resources.sr[ns]).map(basePlural));
    const en = new Set(flatten(resources.en[ns]).map(basePlural));
    expect([...sr].filter((k) => !en.has(k))).toEqual([]);
    expect([...en].filter((k) => !sr.has(k))).toEqual([]);
  });
});
