import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Stepper } from '@/components/ui/Stepper';
import { BAR_OPTIONS_KG } from '@/constants/plates';
import { WEIGHT_STEP_KG } from '@/constants/training';
import { OptionGroup } from '@/features/settings/components/OptionGroup';
import { formatWeight } from '@/utils/number';

import { BarbellVisual } from '../../components/BarbellVisual';
import { usePlateCalculator } from '../../hooks/usePlateCalculator';
import { styles } from './PlateCalculatorScreen.styles';

const MAX_TARGET = 400;

export function PlateCalculatorScreen() {
  const { t } = useTranslation(['plates', 'common']);
  const calc = usePlateCalculator();
  const { result } = calc;

  return (
    <ScreenContainer>
      <ScreenHeader title={t('plates:title')} onBack={calc.back} backLabel={t('common:back')} />
      <Card>
        <Stepper label={t('plates:target')} value={calc.targetKg} step={WEIGHT_STEP_KG} decimal min={0} max={MAX_TARGET} onChange={calc.setTargetKg} />
        <OptionGroup label={t('plates:bar')} value={calc.barKg} onChange={calc.setBarKg} options={BAR_OPTIONS_KG.map((b) => ({ value: b, label: `${b} kg` }))} />
      </Card>
      <Card>
        <BarbellVisual plates={result.perSide} />
        <Text style={styles.label}>{t('plates:perSide')}</Text>
        {result.perSide.length === 0 ? (
          <Text style={styles.perSide}>{t('plates:onlyBar')}</Text>
        ) : (
          <View style={styles.chips}>
            {result.perSide.map((p, i) => (
              <Chip key={`${p}-${i}`} label={`${formatWeight(p)} kg`} />
            ))}
          </View>
        )}
        <Text style={styles.total}>{`${t('plates:total')}: ${formatWeight(result.achievedKg)} kg`}</Text>
        {result.belowBar ? <Text style={styles.warning}>{t('plates:belowBar')}</Text> : null}
        {!result.belowBar && result.remainderKg > 0 ? <Text style={styles.warning}>{t('plates:remainder', { value: formatWeight(result.achievedKg) })}</Text> : null}
      </Card>
    </ScreenContainer>
  );
}
