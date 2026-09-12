export interface RestOverlayProps {
  title: string;
  kindLabel: string;
  remainingSec: number;
  totalSec: number;
  progress: number;
  ofLabel: string;
  nextTitle: string;
  nextMeta: string;
  extendLabel: string;
  skipLabel: string;
  onExtend: () => void;
  onSkip: () => void;
}
