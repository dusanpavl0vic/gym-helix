export interface CalendarDay {
  date: Date;
  strength: boolean;
  cardio: boolean;
}

export interface CalendarMonthProps {
  monthLabel: string;
  weekdayLabels: string[];
  firstWeekday: number;
  days: CalendarDay[];
  selectedDay: Date | null;
  onSelectDay: (day: Date) => void;
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
}
