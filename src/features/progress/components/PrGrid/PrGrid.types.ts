export interface PrItem {
  key: string;
  label: string;
  value: string;
  note: string;
}

export interface PrGridProps {
  items: PrItem[];
}
