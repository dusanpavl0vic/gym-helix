import { Text, View } from 'react-native';

import { SegmentedControl } from '@/components/ui/SegmentedControl';

import { styles } from './OptionGroup.styles';
import type { OptionGroupProps } from './OptionGroup.types';

export function OptionGroup<T extends string | number>({ label, options, value, onChange }: OptionGroupProps<T>) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <SegmentedControl
        items={options.map((o) => ({ key: String(o.value), label: o.label }))}
        selectedKey={String(value)}
        onSelect={(key) => {
          const option = options.find((o) => String(o.value) === key);
          if (option) onChange(option.value);
        }}
      />
    </View>
  );
}
