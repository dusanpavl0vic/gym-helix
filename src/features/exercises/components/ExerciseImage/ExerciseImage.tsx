import { Image } from 'expo-image';
import { View } from 'react-native';

import { Icon } from '@/components/ui/Icon';
import { animation } from '@/constants/animation';

import { styles } from './ExerciseImage.styles';
import type { ExerciseImageProps } from './ExerciseImage.types';

const ICON_RATIO = 0.42;

export function ExerciseImage({ exercise, size, placeholderLabel }: ExerciseImageProps) {
  const source = exercise?.images[0];
  if (!source) {
    return (
      <View style={[styles.placeholder, { width: size, height: size }]} accessibilityLabel={placeholderLabel}>
        <Icon name="gallery" size={Math.round(size * ICON_RATIO)} color="forest" />
      </View>
    );
  }
  return (
    <View style={[styles.box, { width: size, height: size }]}>
      <Image source={source} style={{ width: size, height: size }} contentFit="cover" transition={animation.fast} />
    </View>
  );
}
