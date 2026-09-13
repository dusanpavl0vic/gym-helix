/**
 * Icon registry — the single source for scripts/icons.ts (Tabler download + docs/ICONS.md)
 * and the Icon component. Import-free so the Node script can load it directly.
 * `color` is the key in constants/colors.ts the icon is usually drawn with.
 */

export const TABLER_VERSION = '3.46.0';

interface IconSpec {
  tabler: string;
  usage: string;
  color: string;
}

export const ICONS = {
  'tab-today': { tabler: 'home', usage: 'Tab „Danas“ (neaktivan: mutedLight)', color: 'forest' },
  'tab-plan': { tabler: 'calendar-week', usage: 'Tab „Plan“ (neaktivan: mutedLight)', color: 'forest' },
  'tab-progress': { tabler: 'chart-line', usage: 'Tab „Napredak“ (neaktivan: mutedLight)', color: 'forest' },
  'tab-more': { tabler: 'menu-2', usage: 'Tab „Više“ (neaktivan: mutedLight)', color: 'forest' },
  back: { tabler: 'chevron-left', usage: 'Nazad u zaglavlju ekrana', color: 'ink' },
  close: { tabler: 'x', usage: 'Zatvaranje treninga, dijaloga i donjeg prozora', color: 'ink' },
  'chevron-right': { tabler: 'chevron-right', usage: 'Strelica u redovima liste', color: 'mutedLight' },
  'chevron-down': { tabler: 'chevron-down', usage: 'Otvaranje i sklapanje (zagrevanje)', color: 'forest' },
  more: { tabler: 'dots-vertical', usage: 'Opcije vežbe tokom treninga', color: 'ink' },
  plus: { tabler: 'plus', usage: 'Dodavanje, +kg i +ponavljanje', color: 'forest' },
  minus: { tabler: 'minus', usage: '−kg i −ponavljanje', color: 'forest' },
  check: { tabler: 'check', usage: 'Završena serija, potvrda', color: 'paperWarm' },
  edit: { tabler: 'pencil', usage: 'Izmena programa i treninga', color: 'forest' },
  delete: { tabler: 'trash', usage: 'Brisanje', color: 'danger' },
  copy: { tabler: 'copy', usage: 'Kopiranje programa', color: 'forest' },
  'arrow-up': { tabler: 'arrow-up', usage: 'Pomeri gore (redosled)', color: 'forest' },
  'arrow-down': { tabler: 'arrow-down', usage: 'Pomeri dole (redosled)', color: 'forest' },
  restore: { tabler: 'restore', usage: 'Vrati podrazumevani program', color: 'forest' },
  start: { tabler: 'player-play', usage: 'Počni trening', color: 'ink' },
  swap: { tabler: 'replace', usage: 'Zameni vežbu alternativom', color: 'ink' },
  skip: { tabler: 'player-skip-forward', usage: 'Preskoči pauzu ili vežbu', color: 'ink' },
  timer: { tabler: 'clock-hour-4', usage: 'Trajanje treninga i pauza', color: 'forest' },
  'timer-plus': { tabler: 'clock-plus', usage: '+15 s na ekranu pauze', color: 'mint' },
  workout: { tabler: 'barbell', usage: 'Trening i istorija treninga', color: 'forest' },
  plates: { tabler: 'weight', usage: 'Kalkulator tegova', color: 'forest' },
  weight: { tabler: 'scale', usage: 'Težina danas, telo', color: 'forest' },
  measure: { tabler: 'ruler-measure', usage: 'Obimi tela', color: 'forest' },
  run: { tabler: 'run', usage: 'Kardio: trčanje', color: 'forest' },
  swim: { tabler: 'swimming', usage: 'Kardio: bazen', color: 'forest' },
  walk: { tabler: 'walk', usage: 'Kardio: hodanje', color: 'forest' },
  zone2: { tabler: 'heartbeat', usage: 'Kardio: zona 2 i puls', color: 'forest' },
  hiit: { tabler: 'flame', usage: 'Kardio: HIIT', color: 'forest' },
  'rest-day': { tabler: 'stretching', usage: 'Dan odmora u predlogu nedelje', color: 'muted' },
  trophy: { tabler: 'trophy', usage: 'Rekordi', color: 'lime' },
  'volume-chart': { tabler: 'chart-bar', usage: 'Nedeljni volumen', color: 'forest' },
  history: { tabler: 'calendar-event', usage: 'Istorija i kalendar', color: 'forest' },
  programs: { tabler: 'list-details', usage: 'Programi', color: 'forest' },
  settings: { tabler: 'settings', usage: 'Podešavanja', color: 'forest' },
  backup: { tabler: 'device-floppy', usage: 'Backup i reset', color: 'forest' },
  export: { tabler: 'upload', usage: 'Izvoz podataka', color: 'forest' },
  import: { tabler: 'download', usage: 'Uvoz podataka', color: 'forest' },
  bell: { tabler: 'bell', usage: 'Obaveštenja i dozvola za obaveštenja', color: 'forest' },
  sound: { tabler: 'volume', usage: 'Zvuk pauze', color: 'forest' },
  vibration: { tabler: 'device-mobile-vibration', usage: 'Vibracija', color: 'forest' },
  language: { tabler: 'language', usage: 'Jezik', color: 'forest' },
  camera: { tabler: 'camera', usage: 'Kamera i dozvola za kameru', color: 'forest' },
  gallery: { tabler: 'photo', usage: 'Galerija i slika vežbe', color: 'forest' },
  'status-done': { tabler: 'circle-check', usage: 'Vežba ili serija završena', color: 'forest' },
  'status-todo': { tabler: 'circle', usage: 'Vežba nije počela', color: 'mutedLight' },
  'status-partial': { tabler: 'circle-dashed', usage: 'Vežba u toku', color: 'lime' },
  'status-skipped': { tabler: 'circle-x', usage: 'Preskočena vežba', color: 'danger' },
  warning: { tabler: 'alert-triangle', usage: 'Upozorenja i brisanje', color: 'danger' },
  backspace: { tabler: 'backspace', usage: 'Brisanje cifre na tastaturi', color: 'ink' },
  info: { tabler: 'info-circle', usage: 'Napomene i deload', color: 'muted' },
} as const satisfies Record<string, IconSpec>;

export type IconName = keyof typeof ICONS;

export const ICON_NAMES = Object.keys(ICONS) as IconName[];

/** Tab route name → icon. */
export const TAB_ICONS = {
  index: 'tab-today',
  plan: 'tab-plan',
  progress: 'tab-progress',
  more: 'tab-more',
} as const satisfies Record<string, IconName>;
