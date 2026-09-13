import type { CardioType } from '@/types/domain';

export interface CardioTypePickerProps {
  value: CardioType;
  labels: Record<CardioType, string>;
  onChange: (type: CardioType) => void;
}
