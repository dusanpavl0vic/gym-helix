import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/constants/icons';

import { useBackup } from '../../hooks/useBackup';
import { styles } from './BackupScreen.styles';

const TITLE_ICON = 22;

function CardTitle({ icon, title, danger }: { icon: IconName; title: string; danger?: boolean }) {
  return (
    <View style={styles.titleRow}>
      <Icon name={icon} size={TITLE_ICON} color={danger ? 'danger' : 'forest'} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export function BackupScreen() {
  const { t } = useTranslation(['backup', 'common']);
  const backup = useBackup();

  return (
    <ScreenContainer>
      <ScreenHeader title={t('backup:title')} onBack={backup.back} backLabel={t('common:back')} />
      {backup.status ? (
        <View style={styles.status}>
          <Icon name={backup.status.tone === 'success' ? 'status-done' : 'warning'} size={TITLE_ICON} color={backup.status.tone === 'success' ? 'forest' : 'danger'} />
          <Text style={backup.status.tone === 'success' ? styles.success : styles.error}>{backup.status.message}</Text>
        </View>
      ) : null}
      <Card>
        <CardTitle icon="export" title={t('backup:exportTitle')} />
        <Text style={styles.body}>{t('backup:exportBody')}</Text>
        <Button label={t('backup:export')} icon="export" onPress={backup.exportData} disabled={backup.busy} />
      </Card>
      <Card>
        <CardTitle icon="import" title={t('backup:importTitle')} />
        <Text style={styles.body}>{t('backup:importBody')}</Text>
        <Button label={t('backup:import')} icon="import" onPress={backup.importData} disabled={backup.busy} variant="outline" />
      </Card>
      <Card>
        <CardTitle icon="warning" title={t('backup:resetTitle')} danger />
        <Text style={styles.body}>{t('backup:resetBody')}</Text>
        <Button label={t('backup:reset')} icon="delete" onPress={backup.resetData} disabled={backup.busy} variant="danger" />
      </Card>
    </ScreenContainer>
  );
}
