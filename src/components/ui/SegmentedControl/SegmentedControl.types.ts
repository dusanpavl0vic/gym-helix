export interface SegmentItem {
  key: string;
  label: string;
}

export interface SegmentedControlProps {
  items: SegmentItem[];
  selectedKey: string;
  onSelect: (key: string) => void;
}
