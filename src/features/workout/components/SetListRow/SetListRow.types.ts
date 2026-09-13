export interface SetListRowProps {
  label: string;
  value: string;
  done: boolean;
  selected: boolean;
  isNext: boolean;
  onPress: () => void;
}
