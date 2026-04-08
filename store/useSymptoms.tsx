import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IInfoStore {
    name: string;

    setValue: (data: number | string | string[] | null | boolean, key: string) => void;
    reset: () => void;
}
const useSymptomsStore = create<IInfoStore>()(
    persist(
        (set) => ({
            name: 'Lily',

            setValue: (data, key) => set((state) => ({ ...state, [key]: data })),
            reset: () => set({ name: 'Lily' }),
        }),
        {
            name: 'symptoms',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                name: state.name,

              }),
        }
    )
);

export default useSymptomsStore;
