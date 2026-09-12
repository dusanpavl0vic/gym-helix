import type { ExerciseKind } from '@/constants/training';
import type { PhotoSource } from '@/lib/files/imagePicker';
import type { MuscleGroup } from '@/types/domain';

export interface CustomExerciseInput {
  name: string;
  muscles: MuscleGroup[];
  kind: ExerciseKind;
  photoSource?: PhotoSource;
}

export interface CustomExerciseFormProps {
  onSubmit: (input: CustomExerciseInput) => void;
  onCancel: () => void;
}
