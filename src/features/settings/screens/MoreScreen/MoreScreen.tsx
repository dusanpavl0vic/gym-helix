import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ListItem } from '@/components/common/ListItem';
import { Logo } from '@/components/common/Logo';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { APP_NAME } from '@/constants/config';
import type { IconName } from '@/constants/icons';
import { routes } from '@/constants/routes';

import { styles } from './MoreScreen.styles';

const BRAND_LOGO_SIZE = 64;

const ITEMS: { key: string; icon: IconName; route: string }[] = [
  { key: 'programs', icon: 'programs', route: routes.programs },
  { key: 'cardio', icon: 'run', route: routes.cardio },
  { key: 'body', icon: 'weight', route: routes.body },
  { key: 'plates', icon: 'plates', route: routes.plates },
  { key: 'settings', icon: 'settings', route: routes.settings },
  { key: 'backup', icon: 'backup', route: routes.backup },
];

export function MoreScreen() {
  const { t } = useTranslation('settings');
  const router = useRouter();

  return (
    <ScreenContainer>
      <ScreenHeader title={t('more.title')} />
      <View style={styles.list}>
        {ITEMS.map((item) => (
          <ListItem key={item.key} icon={item.icon} title={t(`more.${item.key}`)} subtitle={t(`more.${item.key}Hint`)} onPress={() => router.push(item.route as never)} />
        ))}
      </View>
      <View style={styles.brand}>
        <Logo size={BRAND_LOGO_SIZE} withBackground />
        <Text style={styles.brandName}>{APP_NAME}</Text>
      </View>
      <Text style={styles.version}>{t('more.version', { version: Constants.expoConfig?.version ?? '1.0.0' })}</Text>
    </ScreenContainer>
  );
}
