export interface PillTabItem {
  key: string;
  label: string;
}

export interface PillTabsProps {
  items: PillTabItem[];
  selectedKey: string | undefined;
  onSelect: (key: string) => void;
  size?: 'md' | 'sm';
}
