import type { ReactNode } from 'react';

import type { ExerciseImage } from '@/types/domain';

export interface ImageGalleryProps {
  images: ExerciseImage[];
  height: number;
  placeholderLabel: string;
  placeholderCaption?: string;
  rounded?: boolean;
  overlay?: ReactNode;
}
