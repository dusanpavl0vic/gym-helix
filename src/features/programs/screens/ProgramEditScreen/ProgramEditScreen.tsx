import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { EmptyState } from '@/components/common/EmptyState';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { TextField } from '@/components/ui/TextField';

import { WorkoutRow } from '../../components/WorkoutRow';
import { useProgramEditor } from '../../hooks/useProgramEditor';
import { styles } from './ProgramEditScreen.styles';

export function ProgramEditScreen() {
  const { t } = useTranslation(['programs', 'common']);
  const editor = useProgramEditor();

  if (!editor.exists) {
    return (
      <ScreenContainer>
        <ScreenHeader title={t('programs:edit.title')} onBack={editor.actions.back} backLabel={t('common:back')} />
        <EmptyState message={t('common:notFound')} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScreenHeader title={t('programs:edit.title')} onBack={editor.actions.back} backLabel={t('common:back')} right={editor.isActive ? <Chip label={t('programs:active')} variant="lime" /> : undefined} />
      <TextField key={editor.name} label={t('programs:edit.name')} defaultValue={editor.name} onEndEditing={(e) => editor.actions.rename(e.nativeEvent.text)} />
      {!editor.isActive ? <Button label={t('programs:setActive')} icon="check" onPress={editor.actions.activate} /> : null}
      <View style={styles.section}>
        <SectionHeader title={t('programs:edit.rotation')} />
        <Text style={styles.hint}>{t('programs:edit.rotationHint')}</Text>
        {editor.workouts.map((w) => (
          <WorkoutRow
              key={w.id}
              badge={w.badge}
              name={w.name}
              meta={w.meta}
              canMoveUp={w.index > 0}
              canMoveDown={w.index < editor.workouts.length - 1}
              labels={{ moveUp: t('programs:edit.moveUp'), moveDown: t('programs:edit.moveDown'), delete: t('common:delete') }}
              onOpen={() => editor.actions.openWorkout(w.id)}
              onMoveUp={() => editor.actions.move(w.index, -1)}
              onMoveDown={() => editor.actions.move(w.index, 1)}
              onDelete={() => editor.actions.removeWorkout(w.id)}
            />
        ))}
        <Button label={t('programs:edit.addWorkout')} icon="plus" onPress={editor.actions.addWorkout} variant="outline" />
      </View>
      <View style={styles.actions}>
        <Button label={t('programs:duplicate')} icon="copy" onPress={editor.actions.duplicate} variant="ghost" />
      </View>
    </ScreenContainer>
  );
}
