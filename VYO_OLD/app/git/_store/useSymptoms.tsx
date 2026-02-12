import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IInfoStore {
    name: string;

    setValue: (data: number | string | string[] | null | boolean, key: string)=> void
    
}
const useProfileStore = create<IInfoStore>()(
    persist(
        (set) => ({
            name: 'Lily',

            setValue: (data, key) =>   set((state) => ({...state, [key]: data })),
        }),
        //Values that will be saved in storage
        {
            name: 'symptoms',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                name: state.name,

              }),
        }
    )
);

export default useProfileStore;


