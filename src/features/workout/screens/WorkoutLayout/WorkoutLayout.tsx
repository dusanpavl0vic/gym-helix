import { Stack } from 'expo-router';
import { View } from 'react-native';

import { colors } from '@/constants/colors';
import { useKeepAwakeWhileActive } from '@/hooks/useKeepAwakeWhileActive';

import { RestOverlayHost } from '../../components/RestOverlayHost';
import { styles } from './WorkoutLayout.styles';

export function WorkoutLayout() {
  useKeepAwakeWhileActive();
  return (
    <View style={styles.root}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.cream }, animation: 'slide_from_right' }} />
      <RestOverlayHost />
    </View>
  );
}
