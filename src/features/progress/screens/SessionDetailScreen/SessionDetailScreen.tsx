import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AnimatedEntry } from '@/components/common/AnimatedEntry';
import { EmptyState } from '@/components/common/EmptyState';
import { ListItem } from '@/components/common/ListItem';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { routes } from '@/constants/routes';

import { useSessionDetail } from '../../hooks/useSessionDetail';
import { styles } from './SessionDetailScreen.styles';

export function SessionDetailScreen() {
  const { t } = useTranslation(['progress', 'common']);
  const router = useRouter();
  const { view, back, remove } = useSessionDetail();

  if (!view) {
    return (
      <ScreenContainer>
        <ScreenHeader title={t('progress:session.title')} onBack={back} backLabel={t('common:back')} />
        <EmptyState message={t('common:notFound')} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScreenHeader eyebrow={view.eyebrow} title={view.title} onBack={back} backLabel={t('common:back')} />
      <AnimatedEntry index={0} style={styles.stats}>
        {view.stats.map((s) => (
          <StatTile key={s.key} value={s.value} label={s.label} />
        ))}
      </AnimatedEntry>
      <View style={styles.section}>
        <SectionHeader title={t('progress:session.exercises')} />
        {view.exercises.map((e, i) => (
          <AnimatedEntry key={e.key} index={i + 1}>
            <ListItem
              title={e.name}
              subtitle={e.substituted ? `${e.detail}\n${e.substituted}` : e.detail}
              onPress={() => router.push(routes.exercise(e.exerciseId))}
            />
          </AnimatedEntry>
        ))}
      </View>
      {view.bodyweight || view.notes ? (
        <Card>
          {view.bodyweight ? <Text style={styles.substituted}>{`${t('progress:session.bodyweight')}: ${view.bodyweight}`}</Text> : null}
          {view.notes ? <Text style={styles.notes}>{view.notes}</Text> : null}
        </Card>
      ) : null}
      <Button label={t('progress:session.delete')} onPress={remove} variant="danger" />
    </ScreenContainer>
  );
}
