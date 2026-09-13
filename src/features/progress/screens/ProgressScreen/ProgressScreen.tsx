import { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SegmentedControl } from '@/components/ui/SegmentedControl';

import { BodyTab } from '../../components/BodyTab';
import { HistoryTab } from '../../components/HistoryTab';
import { OverviewTab } from '../../components/OverviewTab';
import { StrengthTab } from '../../components/StrengthTab';

type ProgressTab = 'strength' | 'overview' | 'history' | 'body';
const TABS: ProgressTab[] = ['strength', 'overview', 'history', 'body'];

export function ProgressScreen() {
  const { t } = useTranslation('progress');
  const [tab, setTab] = useState<ProgressTab>('strength');

  return (
    <ScreenContainer>
      <ScreenHeader title={t('title')} subtitle={t('subtitle')} />
      <SegmentedControl
        items={TABS.map((key) => ({ key, label: key === 'overview' ? t('overview') : t(`tabs.${key}`) }))}
        selectedKey={tab}
        onSelect={(key) => setTab(key as ProgressTab)}
      />
      <View>
        {tab === 'strength' ? <StrengthTab /> : null}
        {tab === 'overview' ? <OverviewTab /> : null}
        {tab === 'history' ? <HistoryTab /> : null}
        {tab === 'body' ? <BodyTab /> : null}
      </View>
    </ScreenContainer>
  );
}
