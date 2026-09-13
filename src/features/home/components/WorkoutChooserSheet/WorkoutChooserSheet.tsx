import { Text, View } from 'react-native';

import { BottomSheet } from '@/components/common/BottomSheet';
import { PressableScale } from '@/components/common/PressableScale';
import { Chip } from '@/components/ui/Chip';

import { styles } from './WorkoutChooserSheet.styles';
import type { WorkoutChooserSheetProps } from './WorkoutChooserSheet.types';

export function WorkoutChooserSheet({ visible, title, nextLabel, closeLabel, options, onSelect, onClose }: WorkoutChooserSheetProps) {
  return (
    <BottomSheet visible={visible} title={title} onClose={onClose} closeLabel={closeLabel}>
      {options.map((option) => (
        <PressableScale
          key={option.id}
          accessibilityLabel={option.name}
          style={[styles.option, option.isNext && styles.optionNext]}
          pressedStyle={styles.pressed}
          onPress={() => {
            onClose();
            onSelect(option.id);
          }}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{option.badge}</Text>
          </View>
          <View style={styles.texts}>
            <Text style={styles.name}>{option.name}</Text>
            {option.focus ? <Text style={styles.focus}>{option.focus}</Text> : null}
            <Text style={styles.meta}>{option.meta}</Text>
          </View>
          <View style={styles.chips}>
            {option.isNext ? <Chip label={nextLabel} variant="lime" /> : null}
            {option.dayLabel ? <Chip label={option.dayLabel} variant="outline" /> : null}
          </View>
        </PressableScale>
      ))}
    </BottomSheet>
  );
}
