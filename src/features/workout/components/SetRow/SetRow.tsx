import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, LinearTransition, useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';

import { Stepper } from '@/components/ui/Stepper';
import { animation } from '@/constants/animation';
import { REPS_STEP } from '@/constants/training';
import { formatWeight } from '@/utils/number';

import { RirPicker } from '../RirPicker';
import { styles } from './SetRow.styles';
import type { SetRowProps } from './SetRow.types';

export function SetRow({ index, set, isCurrent, weightStep, unitLabel, repsLabel, rirLabel, bodyweightLabel, onChange, onReopen }: SetRowProps) {
  const pop = useSharedValue(1);

  useEffect(() => {
    if (set.done) pop.value = withSequence(withSpring(animation.pop, animation.spring), withSpring(1, animation.spring));
  }, [set.done, pop]);

  const markStyle = useAnimatedStyle(() => ({ transform: [{ scale: pop.value }] }));
  const ink = set.done ? styles.inkDone : styles.ink;

  return (
    <Animated.View layout={LinearTransition.duration(animation.normal)} style={[styles.row, isCurrent ? styles.current : styles.idle]}>
      <Pressable
        disabled={!set.done}
        onPress={onReopen}
        accessibilityRole={set.done ? 'button' : undefined}
        accessibilityLabel={`${index + 1}: ${formatWeight(set.weightKg)} ${unitLabel} × ${set.reps}`}
        style={styles.grid}>
        <Text style={styles.number}>{index + 1}</Text>
        <Text style={[styles.cell, ink]}>{set.weightKg > 0 ? formatWeight(set.weightKg) : bodyweightLabel}</Text>
        <Text style={[styles.cell, ink]}>{set.reps}</Text>
        <Animated.View style={[styles.mark, set.done && styles.markDone, isCurrent && styles.markCurrent, markStyle]}>
          <Text style={[styles.markText, set.done ? styles.markTextDone : styles.markTextCurrent]}>
            {set.done ? '✓' : isCurrent ? '›' : ''}
          </Text>
        </Animated.View>
      </Pressable>
      {isCurrent ? (
        <Animated.View entering={FadeIn.duration(animation.normal)} style={{ gap: 10 }}>
          <View style={styles.steppers}>
            <Stepper label={unitLabel.toUpperCase()} value={set.weightKg} step={weightStep} decimal onChange={(weightKg) => onChange({ weightKg })} compact />
            <Stepper label={repsLabel} value={set.reps} step={REPS_STEP} onChange={(reps) => onChange({ reps })} compact />
          </View>
          <RirPicker label={rirLabel} value={set.rir} onChange={(rir) => onChange({ rir })} />
        </Animated.View>
      ) : set.done && set.rir !== undefined ? (
        <Text style={styles.rirValue}>RIR {set.rir}</Text>
      ) : null}
    </Animated.View>
  );
}
