import type { ReactNode } from 'react';

export interface ChartCardProps {
  title: string;
  value?: string;
  hint?: string;
  children: ReactNode;
}
