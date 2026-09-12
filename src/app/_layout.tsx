import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/colors';
import { AppProviders } from '@/lib/providers/AppProviders';

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.cream }, animation: 'slide_from_right' }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="workout/index" options={{ animation: 'slide_from_bottom', gestureEnabled: false }} />
        <Stack.Screen name="workout/summary" options={{ animation: 'fade_from_bottom', gestureEnabled: false }} />
        <Stack.Screen name="exercise/picker" options={{ animation: 'slide_from_bottom' }} />
      </Stack>
    </AppProviders>
  );
}
