import * as SplashScreen from 'expo-splash-screen';
import { useEffect, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistedDataLoaded } from '@/features/backup/store/backupThunks';
import { useAppReady } from '@/hooks/useAppReady';
import { prepareSound } from '@/lib/feedback/sound';
import i18n from '@/lib/i18n';
import { configureRestNotifications } from '@/lib/notifications/restNotifications';
import { persistor, store } from '@/store';

import { styles } from './AppProviders.styles';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

function Bootstrap({ children }: { children: ReactNode }) {
  const ready = useAppReady();

  useEffect(() => {
    store.dispatch(persistedDataLoaded());
    configureRestNotifications(i18n.t('workout:rest.channelName')).catch(() => undefined);
    prepareSound().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => undefined);
  }, [ready]);

  return ready ? children : null;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <I18nextProvider i18n={i18n}>
              <Bootstrap>{children}</Bootstrap>
            </I18nextProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
