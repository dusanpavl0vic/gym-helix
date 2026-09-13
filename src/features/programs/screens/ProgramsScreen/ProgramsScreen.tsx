import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Button } from '@/components/ui/Button';

import { ProgramCard } from '../../components/ProgramCard';
import { usePrograms } from '../../hooks/usePrograms';
import { styles } from './ProgramsScreen.styles';

export function ProgramsScreen() {
  const { t } = useTranslation(['programs', 'common']);
  const programs = usePrograms();

  return (
    <ScreenContainer>
      <ScreenHeader title={t('programs:title')} onBack={programs.actions.back} backLabel={t('common:back')} />
      <View style={styles.list}>
        {programs.items.map((item) => (
          <ProgramCard
            key={item.id}
            name={item.name}
            subtitle={item.subtitle}
            isActive={item.isActive}
            isDefault={item.isDefault}
            canDelete={programs.canDelete}
            labels={{
              active: t('programs:active'),
              default: t('programs:default'),
              setActive: t('programs:setActive'),
              duplicate: t('programs:duplicate'),
              edit: t('common:edit'),
              delete: t('programs:delete'),
            }}
            onOpen={() => programs.actions.open(item.id)}
            onActivate={() => programs.actions.activate(item.id)}
            onDuplicate={() => programs.actions.duplicate(item.id)}
            onDelete={() => programs.actions.remove(item.id)}
          />
        ))}
      </View>
      <View style={styles.actions}>
        <Button label={t('programs:newEmpty')} icon="plus" onPress={programs.actions.create} variant="outline" />
        <Button label={t('programs:restoreDefault')} icon="restore" onPress={programs.actions.restoreDefault} variant="ghost" />
      </View>
    </ScreenContainer>
  );
}
