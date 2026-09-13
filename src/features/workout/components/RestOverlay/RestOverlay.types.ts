export interface RestOverlayProps {
  title: string;
  kindLabel: string;
  remainingSec: number;
  progress: number;
  ofLabel: string;
  nextTitle: string;
  nextMeta: string;
  extendLabel: string;
  skipLabel: string;
  onExtend: () => void;
  onSkip: () => void;
}
