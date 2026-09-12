import { Text, View } from 'react-native';

import { NumberInput } from '@/components/ui/NumberInput';

import { styles } from './MeasurementForm.styles';
import type { MeasurementFormProps } from './MeasurementForm.types';

export function MeasurementForm({ fields, labels, values, onChange }: MeasurementFormProps) {
  return (
    <View style={styles.grid}>
      {fields.map((field) => (
        <View key={field} style={styles.cell}>
          <Text style={styles.label}>{labels[field].toUpperCase()}</Text>
          <NumberInput value={values[field]} onChange={(v) => onChange(field, v)} decimal accessibilityLabel={labels[field]} />
        </View>
      ))}
    </View>
  );
}
