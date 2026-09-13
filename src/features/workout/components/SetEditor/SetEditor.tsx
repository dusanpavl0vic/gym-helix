import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';

import { ValueControl } from '../ValueControl';
import { styles } from './SetEditor.styles';
import type { SetEditorProps } from './SetEditor.types';

export function SetEditor(props: SetEditorProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{props.title}</Text>
      <ValueControl
        label={props.weightLabel}
        valueText={props.weightText}
        placeholder={props.weightPlaceholder}
        unitLabel={props.unitLabel}
        decrementLabel={props.decreaseLabel}
        incrementLabel={props.increaseLabel}
        onDecrement={() => props.onWeightStep(-1)}
        onIncrement={() => props.onWeightStep(1)}
        onPressValue={props.onOpenWeight}
      />
      <ValueControl
        label={props.repsLabel}
        valueText={props.repsText}
        placeholder="0"
        decrementLabel={props.decreaseLabel}
        incrementLabel={props.increaseLabel}
        onDecrement={() => props.onRepsStep(-1)}
        onIncrement={() => props.onRepsStep(1)}
        onPressValue={props.onOpenReps}
      />
      <Button label={props.primaryLabel} icon="check" onPress={props.onPrimary} variant={props.isDone ? 'outline' : 'dark'} size="lg" />
    </View>
  );
}
