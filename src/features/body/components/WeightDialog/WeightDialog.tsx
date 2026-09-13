import { useTranslation } from 'react-i18next';

import { NumericKeypadSheet } from '@/components/common/NumericKeypadSheet';
import { BODYWEIGHT_QUICK_STEPS_KG } from '@/constants/training';
import { successFeedback } from '@/lib/feedback/haptics';

import type { WeightDialogProps } from './WeightDialog.types';

export function WeightDialog({ visible, initialValue, onSave, onClose }: WeightDialogProps) {
  const { t } = useTranslation(['body', 'common']);
  return (
    <NumericKeypadSheet
      visible={visible}
      title={t('body:weightDialog.title')}
      unitLabel={t('common:units.kg')}
      initialValue={initialValue}
      decimal
      quickSteps={BODYWEIGHT_QUICK_STEPS_KG}
      submitLabel={t('common:save')}
      clearLabel={t('common:keypad.clear')}
      closeLabel={t('common:close')}
      onClose={onClose}
      onSubmit={(value) => {
        if (value !== null && value > 0) {
          onSave(value);
          successFeedback();
        }
        onClose();
      }}
    />
  );
}
