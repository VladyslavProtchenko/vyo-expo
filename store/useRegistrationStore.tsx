import { AdditionalSymptomType, DiagnosisType, SymptomType } from '@/types/diagnosis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MOCK_PROFILE_DATA } from './mockProfileData';

interface IInfoStore {
    name: string;
    email: string;
    age: number;

    weight: number;
    height: number;
    waist: number;
    hips: number;
    unitSystem: 'metric' | 'imperial';

    startMenstruation: string | null;
    menstruationDuration: number;
    cycleDuration: number;

    diagnoses: DiagnosisType[];

    symptoms: SymptomType[];

    additionalSymptoms: AdditionalSymptomType[];

    flow: string;
    isRegularPeriod: string[];

    isPain: boolean | null;
    painType: string;
    intensity: number;

    painPeriod: string;
    painLocation: string[];
    painDuration: string;

    painCase: string;
    isMedicine: string;

    isPainChange: string;

    surgery: string;
    surgeryDate: string;
    otherSymptoms: string[];


    isDiagnosed: boolean;
    finished: boolean;

    setValue: (data: number | string | string[] | null | boolean, key: string)=> void
    loadMockData: () => void
    resetStore: () => void
}
const useRegistrationStore = create<IInfoStore>()(
    persist(
        (set, get) => ({
            name: '',
            email: '',
            age: 5,

            startMenstruation: null,
            menstruationDuration: 5,
            cycleDuration: 28,

            weight: 0,
            height: 0,
            waist: 0,
            hips: 0,
            unitSystem: 'metric',

            diagnoses: [],

            symptoms: [],

            additionalSymptoms: [],

            flow: '',
            isRegularPeriod: [],

            isPain: null,
            painType: '',
            intensity: 0,

            painPeriod: '',
            painLocation: [],
            painDuration: '',

            painCase: '',
            isMedicine: '',

            isPainChange: '',

            surgery: '',
            surgeryDate: '',
            otherSymptoms: [],

            isDiagnosed: false,
            finished: false,
            setValue: (data, key) =>   set((state) => ({...state, [key]: data })),
            loadMockData: () => set((state) => ({...state, ...MOCK_PROFILE_DATA})),
            resetStore: () => {
                AsyncStorage.removeItem('profileInfo').then(() => {
                    set({
                        name: '',
                        email: '',
                        age: 0,
                        startMenstruation: null,
                        menstruationDuration: 5,
                        cycleDuration: 28,
                        weight: 0,
                        height: 0,
                        waist: 0,
                        hips: 0,
                        unitSystem: 'metric',
                        diagnoses: [],
                        symptoms: [],
                        additionalSymptoms: [],
                        flow: '',
                        isRegularPeriod: [],
                        isPain: null,
                        painType: '',
                        intensity: 0,
                        painPeriod: '',
                        painLocation: [],
                        painDuration: '',
                        painCase: '',
                        isMedicine: '',
                        isPainChange: '',
                        surgery: '',
                        surgeryDate: '',
                        otherSymptoms: [],
                        isDiagnosed: false,
                        finished: false,
                        setValue: (data, key) => set((state) => ({...state, [key]: data })),
                        loadMockData: () => set((state) => ({...state, ...MOCK_PROFILE_DATA})),
                        resetStore: () => {},
                    });
                });
            },
        }),
        {
            name: 'profileInfo',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                name: state.name,
                email: state.email,
                age: state.age,
                startMenstruation: state.startMenstruation,
                menstruationDuration: state.menstruationDuration,
                cycleDuration: state.cycleDuration,
                diagnoses: state.diagnoses,
                symptoms: state.symptoms,
                additionalSymptoms: state.additionalSymptoms,
                
                flow: state.flow,
                isRegularPeriod: state.isRegularPeriod,
                isPain: state.isPain,
                painType: state.painType,
                intensity: state.intensity,
                painPeriod: state.painPeriod,
                painLocation: state.painLocation,
                painDuration: state.painDuration,
                painCase: state.painCase,
                isMedicine: state.isMedicine,
                isPainChange: state.isPainChange,
                surgery: state.surgery,
                surgeryDate: state.surgeryDate,
                finished: state.finished,
                weight: state.weight,
                height: state.height,
                waist: state.waist,
                hips: state.hips,
                unitSystem: state.unitSystem,
              }),
            onRehydrateStorage: () => (state) => {
                if (__DEV__ && state && !state.finished) {
                    state.loadMockData();
                    console.log('🔧 Mock profile data loaded for development');
                }
            },
        }
    )
);

export default useRegistrationStore;
