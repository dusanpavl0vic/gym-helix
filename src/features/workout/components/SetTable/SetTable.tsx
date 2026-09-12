import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';

import { SetRow } from '../SetRow';
import { styles } from './SetTable.styles';
import type { SetTableProps } from './SetTable.types';

export function SetTable({ exercise, currentSetIndex, weightStep, unitLabel, labels, onChange, onReopen, onAddSet }: SetTableProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.head}>
        <Text style={styles.headSet}>{labels.set}</Text>
        <Text style={styles.headCell}>{unitLabel.toUpperCase()}</Text>
        <Text style={styles.headCell}>{labels.reps}</Text>
        <View style={styles.headMark} />
      </View>
      {exercise.sets.map((set, i) => (
        <SetRow
          key={i}
          index={i}
          set={set}
          isCurrent={!exercise.skipped && i === currentSetIndex}
          weightStep={weightStep}
          unitLabel={unitLabel}
          repsLabel={labels.reps}
          rirLabel={labels.rir}
          bodyweightLabel={labels.bodyweight}
          onChange={(patch) => onChange(i, patch)}
          onReopen={() => onReopen(i)}
        />
      ))}
      <Button label={labels.addSet} onPress={onAddSet} variant="ghost" />
    </View>
  );
}
