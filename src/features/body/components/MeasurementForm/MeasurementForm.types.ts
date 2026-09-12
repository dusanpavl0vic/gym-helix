import type { BodyField } from '@/features/progress/helpers/analytics';

export interface MeasurementFormProps {
  fields: BodyField[];
  labels: Record<BodyField, string>;
  values: Partial<Record<BodyField, number>>;
  onChange: (field: BodyField, value: number | undefined) => void;
}
