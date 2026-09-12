import type { ReactNode } from 'react';

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  onBack?: () => void;
  backLabel?: string;
  right?: ReactNode;
}
