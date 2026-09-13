import { Image } from 'expo-image';
import { useState } from 'react';
import { ScrollView, Text, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

import { Icon } from '@/components/ui/Icon';
import { animation } from '@/constants/animation';

import { styles } from './ImageGallery.styles';
import type { ImageGalleryProps } from './ImageGallery.types';

const PLACEHOLDER_ICON = 36;

export function ImageGallery({ images, height, placeholderLabel, placeholderCaption, rounded, overlay }: ImageGalleryProps) {
  const [width, setWidth] = useState(0);
  const [page, setPage] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (width > 0) setPage(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <View style={[styles.wrap, rounded && styles.rounded, { height }]} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      {images.length === 0 ? (
        <View style={[styles.placeholder, rounded && styles.rounded]}>
          <Icon name="gallery" size={PLACEHOLDER_ICON} color="forest" />
          <Text style={styles.placeholderLabel}>{placeholderLabel}</Text>
          {placeholderCaption ? <Text style={styles.placeholderCaption}>{placeholderCaption}</Text> : null}
        </View>
      ) : (
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={onScroll}>
          {images.map((source, i) => (
            <Image key={i} source={source} style={[styles.image, { width, height }]} contentFit="contain" transition={animation.fast} accessibilityIgnoresInvertColors />
          ))}
        </ScrollView>
      )}
      {images.length > 1 ? (
        <View style={styles.dots} pointerEvents="none">
          {images.map((_, i) => (
            <View key={i} style={[styles.dot, i === page && styles.dotActive]} />
          ))}
        </View>
      ) : null}
      {overlay}
    </View>
  );
}
