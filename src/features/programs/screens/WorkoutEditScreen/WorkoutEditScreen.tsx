import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AnimatedEntry } from '@/components/common/AnimatedEntry';
import { EmptyState } from '@/components/common/EmptyState';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';

import { PlannedExerciseEditor } from '../../components/PlannedExerciseEditor';
import { useWorkoutEditor } from '../../hooks/useWorkoutEditor';
import { styles } from './WorkoutEditScreen.styles';

export function WorkoutEditScreen() {
  const { t } = useTranslation(['programs', 'common']);
  const editor = useWorkoutEditor();

  if (!editor.exists) {
    return (
      <ScreenContainer>
        <ScreenHeader title={t('programs:workoutEdit.title')} onBack={editor.actions.back} backLabel={t('common:back')} />
        <EmptyState message={t('common:notFound')} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScreenHeader title={t('programs:workoutEdit.title')} onBack={editor.actions.back} backLabel={t('common:back')} />
      <TextField key={`n-${editor.name}`} label={t('programs:workoutEdit.name')} defaultValue={editor.name} onEndEditing={(e) => editor.actions.rename(e.nativeEvent.text)} />
      <TextField key={`f-${editor.focus}`} label={t('programs:workoutEdit.focus')} defaultValue={editor.focus} onEndEditing={(e) => editor.actions.setFocus(e.nativeEvent.text)} />
      <Text style={styles.estimate}>{editor.estimate}</Text>
      <SectionHeader title={t('programs:workoutEdit.exercises')} />
      <View style={styles.list}>
        {editor.items.length === 0 ? <EmptyState message={t('plan:noExercises')} /> : null}
        {editor.items.map((item) => (
          <AnimatedEntry key={item.planned.id} index={item.index}>
            <PlannedExerciseEditor
              planned={item.planned}
              exercise={item.exercise}
              name={item.name}
              note={item.note}
              alternatives={item.alternatives}
              isFirst={item.isFirst}
              isLast={item.isLast}
              onChange={(patch) => editor.actions.update(item.planned.id, patch)}
              onRemove={() => editor.actions.remove(item.planned.id)}
              onMoveUp={() => editor.actions.move(item.index, -1)}
              onMoveDown={() => editor.actions.move(item.index, 1)}
              onAddAlternative={() => editor.actions.addAlternative(item.planned.id)}
              onRemoveAlternative={(id) => editor.actions.removeAlternative(item.planned, id)}
            />
          </AnimatedEntry>
        ))}
      </View>
      <Button label={t('programs:workoutEdit.addExercise')} onPress={editor.actions.addExercise} />
    </ScreenContainer>
  );
}
