import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AnimatedEntry } from '@/components/common/AnimatedEntry';
import { ListItem } from '@/components/common/ListItem';
import { Logo } from '@/components/common/Logo';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { APP_NAME } from '@/constants/config';
import { routes } from '@/constants/routes';

import { styles } from './MoreScreen.styles';

const BRAND_LOGO_SIZE = 64;

const ITEMS = [
  { key: 'programs', glyph: 'P', route: routes.programs },
  { key: 'cardio', glyph: '≈', route: routes.cardio },
  { key: 'body', glyph: '○', route: routes.body },
  { key: 'plates', glyph: '◎', route: routes.plates },
  { key: 'settings', glyph: '⚙', route: routes.settings },
  { key: 'backup', glyph: '⇅', route: routes.backup },
] as const;

export function MoreScreen() {
  const { t } = useTranslation('settings');
  const router = useRouter();

  return (
    <ScreenContainer>
      <ScreenHeader title={t('more.title')} />
      <View style={styles.list}>
        {ITEMS.map((item, i) => (
          <AnimatedEntry key={item.key} index={i}>
            <ListItem
              title={t(`more.${item.key}`)}
              subtitle={t(`more.${item.key}Hint`)}
              onPress={() => router.push(item.route)}
              leading={
                <View style={styles.glyph}>
                  <Text style={styles.glyphText}>{item.glyph}</Text>
                </View>
              }
            />
          </AnimatedEntry>
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
