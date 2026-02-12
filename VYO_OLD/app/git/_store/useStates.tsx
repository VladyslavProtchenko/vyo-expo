import { create } from 'zustand';
import { Dayjs } from 'dayjs';

interface StatesStore {
  isDayCardOpen: boolean;
  setIsDayCardOpen: (value: boolean) => void;
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;
}

const useStates = create<StatesStore>((set) => ({
  isDayCardOpen: false,
  setIsDayCardOpen: (value) => set({ isDayCardOpen: value }),
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

export default useStates;
