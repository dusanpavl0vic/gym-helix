import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { MUSCLE_GROUPS } from '@/constants/muscles';
import type { ExerciseKind } from '@/constants/training';
import type { PhotoSource } from '@/lib/files/imagePicker';
import type { MuscleGroup } from '@/types/domain';

import { styles } from './CustomExerciseForm.styles';
import type { CustomExerciseFormProps } from './CustomExerciseForm.types';

const KINDS: ExerciseKind[] = ['heavyCompound', 'machine', 'isolation'];
const PHOTO_SOURCES: PhotoSource[] = ['gallery', 'camera'];

function ToggleChip({ label, on, onPress }: { label: string; on: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: on }} onPress={onPress} style={[styles.chip, on && styles.chipOn]}>
      <Text style={[styles.chipText, on && styles.chipTextOn]}>{label}</Text>
    </Pressable>
  );
}

export function CustomExerciseForm({ onSubmit, onCancel }: CustomExerciseFormProps) {
  const { t } = useTranslation(['exercises', 'common']);
  const [name, setName] = useState('');
  const [muscles, setMuscles] = useState<MuscleGroup[]>([]);
  const [kind, setKind] = useState<ExerciseKind>('machine');
  const [photoSource, setPhotoSource] = useState<PhotoSource | undefined>();
  const [error, setError] = useState(false);

  const toggleMuscle = (m: MuscleGroup) => setMuscles((list) => (list.includes(m) ? list.filter((x) => x !== m) : [...list, m]));

  const submit = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    onSubmit({ name, muscles, kind, photoSource });
  };

  return (
    <View style={styles.box}>
      <Text style={styles.title}>{t('exercises:picker.customTitle')}</Text>
      <TextField label={t('exercises:picker.name')} value={name} onChangeText={(v) => { setName(v); setError(false); }} autoFocus />
      {error ? <Text style={styles.error}>{t('exercises:picker.nameRequired')}</Text> : null}
      <Text style={styles.label}>{t('exercises:picker.muscles').toUpperCase()}</Text>
      <View style={styles.chips}>
        {MUSCLE_GROUPS.map((m) => (
          <ToggleChip key={m} label={t(`common:muscles.${m}`)} on={muscles.includes(m)} onPress={() => toggleMuscle(m)} />
        ))}
      </View>
      <Text style={styles.label}>{t('exercises:picker.kind').toUpperCase()}</Text>
      <View style={styles.chips}>
        {KINDS.map((k) => (
          <ToggleChip key={k} label={t(`exercises:picker.kinds.${k}`)} on={kind === k} onPress={() => setKind(k)} />
        ))}
      </View>
      <Text style={styles.label}>{t('exercises:picker.photo').toUpperCase()}</Text>
      <View style={styles.chips}>
        {PHOTO_SOURCES.map((source) => (
          <ToggleChip key={source} label={t(`exercises:picker.${source}`)} on={photoSource === source} onPress={() => setPhotoSource(photoSource === source ? undefined : source)} />
        ))}
      </View>
      <View style={styles.row}>
        <Button label={t('common:cancel')} onPress={onCancel} variant="outline" flex={1} />
        <Button label={t('exercises:picker.create')} onPress={submit} flex={1.4} />
      </View>
    </View>
  );
}
