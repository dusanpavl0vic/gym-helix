import { Pressable, Switch, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Stepper } from '@/components/ui/Stepper';
import { TextField } from '@/components/ui/TextField';
import { colors } from '@/constants/colors';
import { DEFAULT_INCREMENT_KG, INCREMENT_OPTIONS_KG } from '@/constants/training';
import { ExerciseImage } from '@/features/exercises/components/ExerciseImage';
import { formatWeight } from '@/utils/number';

import { styles } from './PlannedExerciseEditor.styles';
import type { PlannedExerciseEditorProps } from './PlannedExerciseEditor.types';

const THUMB = 44;
const MAX_SETS = 10;
const MAX_REPS = 50;
const MAX_RIR = 5;
const REST_STEP = 15;
const MAX_REST = 600;

export function PlannedExerciseEditor(props: PlannedExerciseEditorProps) {
  const { t } = useTranslation(['programs', 'exercises', 'common']);
  const { planned, onChange } = props;
  const increment = planned.incrementKg ?? DEFAULT_INCREMENT_KG;

  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <ExerciseImage exercise={props.exercise} size={THUMB} placeholderLabel={t('exercises:imagePlaceholder')} />
        <Text style={styles.name} numberOfLines={2}>{props.name}</Text>
        <View style={styles.controls}>
          <IconButton icon="arrow-up" variant="mint" disabled={props.isFirst} onPress={props.onMoveUp} accessibilityLabel={t('programs:edit.moveUp')} />
          <IconButton icon="arrow-down" variant="mint" disabled={props.isLast} onPress={props.onMoveDown} accessibilityLabel={t('programs:edit.moveDown')} />
        </View>
      </View>
      <View style={styles.grid}>
        <Stepper label={t('programs:workoutEdit.sets')} value={planned.sets} step={1} min={1} max={MAX_SETS} onChange={(sets) => onChange({ sets })} compact />
        <Stepper label={t('programs:workoutEdit.rir')} value={planned.targetRir} step={1} min={0} max={MAX_RIR} onChange={(targetRir) => onChange({ targetRir })} compact />
      </View>
      <View style={styles.grid}>
        <Stepper label={t('programs:workoutEdit.repsMin')} value={planned.repsMin} step={1} min={1} max={MAX_REPS} onChange={(repsMin) => onChange({ repsMin, repsMax: Math.max(repsMin, planned.repsMax) })} compact />
        <Stepper label={t('programs:workoutEdit.repsMax')} value={planned.repsMax} step={1} min={planned.repsMin} max={MAX_REPS} onChange={(repsMax) => onChange({ repsMax })} compact />
      </View>
      <Stepper label={t('programs:workoutEdit.rest')} value={planned.restSec} step={REST_STEP} min={REST_STEP} max={MAX_REST} onChange={(restSec) => onChange({ restSec })} />
      <Text style={styles.label}>{t('programs:workoutEdit.increment').toUpperCase()}</Text>
      <SegmentedControl
        items={INCREMENT_OPTIONS_KG.map((kg) => ({ key: String(kg), label: `+${formatWeight(kg)}` }))}
        selectedKey={String(increment)}
        onSelect={(key) => onChange({ incrementKg: Number(key) })}
      />
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>{t('programs:workoutEdit.perSide')}</Text>
        <Switch
          value={Boolean(planned.perSide)}
          onValueChange={(perSide) => onChange({ perSide })}
          trackColor={{ true: colors.lime, false: colors.track }}
          thumbColor={planned.perSide ? colors.forest : colors.paper}
        />
      </View>
      <TextField label={t('programs:workoutEdit.note')} defaultValue={props.note} placeholder={t('programs:workoutEdit.notePlaceholder')} onEndEditing={(e) => onChange({ note: e.nativeEvent.text })} />
      <Text style={styles.label}>{t('programs:workoutEdit.alternatives').toUpperCase()}</Text>
      <View style={styles.alternatives}>
        {props.alternatives.map((alt) => (
          <View key={alt.id} style={styles.altChip}>
            <Text style={styles.altText}>{alt.name}</Text>
            <Pressable onPress={() => props.onRemoveAlternative(alt.id)} style={styles.altRemove} accessibilityLabel={`${t('common:delete')} ${alt.name}`}>
              <Icon name="close" size={16} color="forest" />
            </Pressable>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <Button label={t('programs:workoutEdit.addAlternative')} icon="plus" onPress={props.onAddAlternative} variant="outline" flex={1} />
        <Button label={t('programs:workoutEdit.remove')} icon="delete" onPress={props.onRemove} variant="danger" flex={1} />
      </View>
    </View>
  );
}
