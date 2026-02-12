import { create } from 'zustand';

interface StatesStore {
  isDayCardOpen: boolean;
  setIsDayCardOpen: (value: boolean) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const useStates = create<StatesStore>((set) => ({
  isDayCardOpen: false,
  setIsDayCardOpen: (value) => set({ isDayCardOpen: value }),
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

export default useStates;
