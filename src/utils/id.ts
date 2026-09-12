let counter = 0;

export function createId(prefix = ''): string {
  counter = (counter + 1) % 1_000_000;
  const time = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}${time}${counter.toString(36)}${rand}`;
}
