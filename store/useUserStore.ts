import { create } from 'zustand';

interface UserStore {
  id: string | null;
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
  flow: string;
  isRegularPeriod: string[];
  
  diagnoses: string[];
  symptoms: string[];
  otherSymptoms: string[];
  
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
  isDiagnosed: boolean;
  
  diagnosis: string | null;
  primaryScore: number;
  secondaryScore: number;
  menstrualPainScore: number;
  
  setUser: (data: Partial<UserStore>) => void;
  resetUser: () => void;
}

const initialState = {
  id: null,
  name: '',
  email: '',
  age: 0,
  weight: 0,
  height: 0,
  waist: 0,
  hips: 0,
  unitSystem: 'metric' as const,
  startMenstruation: null,
  menstruationDuration: 5,
  cycleDuration: 28,
  flow: '',
  isRegularPeriod: [],
  diagnoses: [],
  symptoms: [],
  otherSymptoms: [],
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
  isDiagnosed: false,
  diagnosis: null,
  primaryScore: 0,
  secondaryScore: 0,
  menstrualPainScore: 0,
};

const useUserStore = create<UserStore>((set) => ({
  ...initialState,
  setUser: (data) => set((state) => ({ ...state, ...data })),
  resetUser: () => set(initialState),
}));

export default useUserStore;
