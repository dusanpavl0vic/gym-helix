import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { ActionSheet } from '@/components/common/ActionSheet';
import { NumericKeypadSheet } from '@/components/common/NumericKeypadSheet';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { spacing } from '@/constants/spacing';

import { ExerciseInfoHeader } from '../../components/ExerciseInfoHeader';
import { SetEditor } from '../../components/SetEditor';
import { SetListRow } from '../../components/SetListRow';
import { useExerciseLogger } from '../../hooks/useExerciseLogger';
import { styles } from './ExerciseLoggerScreen.styles';

export function ExerciseLoggerScreen() {
  const { t } = useTranslation(['workout', 'common', 'exercises']);
  const insets = useSafeAreaInsets();
  const logger = useExerciseLogger();

  if (!logger.exists || !logger.view || !logger.editor) return <View style={styles.root} />;
  const { view, editor } = logger;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <IconButton icon="back" onPress={logger.actions.back} accessibilityLabel={t('common:back')} />
        <Text style={styles.position} numberOfLines={1}>{logger.position.toUpperCase()}</Text>
        <IconButton icon="more" onPress={() => logger.menu.setOpen(true)} accessibilityLabel={t('workout:actions.title')} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <ExerciseInfoHeader
          exercise={view.exercise}
          name={view.name}
          scheme={view.scheme}
          note={view.note}
          lastTime={view.lastTime}
          suggestion={view.suggestion}
          tone={view.suggestionTone}
          substitutedLabel={view.substitutedFor ? t('workout:substituted', { name: view.substitutedFor }) : undefined}
          deloadLabel={logger.isDeload ? t('workout:deloadTag') : undefined}
          skippedLabel={view.skipped ? t('workout:skipped') : undefined}
          placeholderLabel={t('exercises:imagePlaceholder')}
        />
        <View style={styles.sets}>
          {logger.rows.map((row) => (
            <SetListRow
              key={row.index}
              label={row.label}
              value={row.value}
              done={row.done}
              selected={row.selected}
              isNext={row.isNext}
              onPress={() => logger.actions.select(row.index)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) + spacing.md }]}>
        {view.skipped ? (
          <Button label={t('workout:unskip')} icon="restore" onPress={logger.actions.unskip} size="lg" />
        ) : (
          <SetEditor
            title={editor.title}
            weightText={editor.weightText}
            repsText={editor.repsText}
            unitLabel={logger.unitLabel}
            weightLabel={t('workout:weight')}
            repsLabel={t('workout:reps')}
            weightPlaceholder={t('workout:weightPlaceholder')}
            decreaseLabel={t('workout:decrease')}
            increaseLabel={t('workout:increase')}
            primaryLabel={editor.primaryLabel}
            isDone={editor.isDone}
            onWeightStep={logger.actions.stepWeight}
            onRepsStep={logger.actions.stepReps}
            onOpenWeight={() => logger.keypad.open('weight')}
            onOpenReps={() => logger.keypad.open('reps')}
            onPrimary={logger.actions.primary}
          />
        )}
      </View>

      <NumericKeypadSheet
        visible={logger.keypad.target !== null}
        title={logger.keypad.title}
        unitLabel={logger.keypad.unitLabel}
        initialValue={logger.keypad.initialValue}
        decimal={logger.keypad.decimal}
        quickSteps={logger.keypad.quickSteps}
        submitLabel={t('common:keypad.ok')}
        clearLabel={t('common:keypad.clear')}
        closeLabel={t('common:close')}
        onSubmit={logger.keypad.submit}
        onClose={logger.keypad.close}
      />
      <ActionSheet
        visible={logger.menu.open}
        title={t('workout:actions.title')}
        actions={logger.menu.actions}
        cancelLabel={t('common:cancel')}
        onClose={() => logger.menu.setOpen(false)}
      />
    </View>
  );
}
