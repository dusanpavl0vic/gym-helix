import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';

import { CustomExerciseForm } from '../../components/CustomExerciseForm';
import { ExerciseListItem } from '../../components/ExerciseListItem';
import { useExercisePicker } from '../../hooks/useExercisePicker';
import { styles } from './ExercisePickerScreen.styles';

export function ExercisePickerScreen() {
  const { t } = useTranslation(['exercises', 'common']);
  const picker = useExercisePicker();

  return (
    <ScreenContainer>
      <ScreenHeader title={t('exercises:picker.title')} onBack={picker.back} backLabel={t('common:back')} />
      {picker.creating ? (
        <CustomExerciseForm onSubmit={picker.createCustom} onCancel={() => picker.setCreating(false)} />
      ) : (
        <Button label={t('exercises:picker.custom')} onPress={() => picker.setCreating(true)} variant="outline" />
      )}
      <TextField placeholder={t('exercises:picker.search')} value={picker.query} onChangeText={picker.setQuery} autoCorrect={false} />
      <View style={styles.list}>
        {picker.items.map(({ exercise, name }) => (
          <ExerciseListItem
            key={exercise.id}
            exercise={exercise}
            name={name}
            subtitle={exercise.primaryMuscles.map((m) => t(`common:muscles.${m}`)).join(' · ')}
            badge={exercise.isCustom ? t('exercises:picker.customBadge') : undefined}
            placeholderLabel={t('exercises:imagePlaceholder').replace(' ', '\n')}
            onPress={() => picker.pick(exercise.id)}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}
