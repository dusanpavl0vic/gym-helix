import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { animation } from '@/constants/animation';

import { styles } from './ExerciseImage.styles';
import type { ExerciseImageProps } from './ExerciseImage.types';

export function ExerciseImage({ exercise, size, placeholderLabel }: ExerciseImageProps) {
  const source = exercise?.images[0];
  if (!source) {
    return (
      <View style={[styles.placeholder, { width: size, height: size }]}>
        <Text style={styles.placeholderText}>{placeholderLabel}</Text>
      </View>
    );
  }
  return (
    <View style={[styles.box, { width: size, height: size }]}>
      <Image source={source} style={{ width: size, height: size }} contentFit="cover" transition={animation.normal} />
    </View>
  );
}
