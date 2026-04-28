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
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                name: state.name,
            }),
            version: 1,
            migrate: (persistedState, version) => {
                // Handle future store shape migrations here
                // Example: if (version === 0) { ... }
                return persistedState as IInfoStore;
            },
        }
    )
);

export default useSymptomsStore;
