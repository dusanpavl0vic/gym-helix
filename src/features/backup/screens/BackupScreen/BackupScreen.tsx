import { Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { animation } from '@/constants/animation';

import { useBackup } from '../../hooks/useBackup';
import { styles } from './BackupScreen.styles';

export function BackupScreen() {
  const { t } = useTranslation(['backup', 'common']);
  const backup = useBackup();

  return (
    <ScreenContainer>
      <ScreenHeader title={t('backup:title')} onBack={backup.back} backLabel={t('common:back')} />
      {backup.status ? (
        <Animated.Text entering={FadeIn.duration(animation.normal)} style={backup.status.tone === 'success' ? styles.success : styles.error}>
          {backup.status.message}
        </Animated.Text>
      ) : null}
      <Card>
        <Text style={styles.title}>{t('backup:exportTitle')}</Text>
        <Text style={styles.body}>{t('backup:exportBody')}</Text>
        <Button label={t('backup:export')} onPress={backup.exportData} disabled={backup.busy} />
      </Card>
      <Card>
        <Text style={styles.title}>{t('backup:importTitle')}</Text>
        <Text style={styles.body}>{t('backup:importBody')}</Text>
        <Button label={t('backup:import')} onPress={backup.importData} disabled={backup.busy} variant="outline" />
      </Card>
      <Card>
        <Text style={styles.title}>{t('backup:resetTitle')}</Text>
        <Text style={styles.body}>{t('backup:resetBody')}</Text>
        <Button label={t('backup:reset')} onPress={backup.resetData} disabled={backup.busy} variant="danger" />
      </Card>
    </ScreenContainer>
  );
}
