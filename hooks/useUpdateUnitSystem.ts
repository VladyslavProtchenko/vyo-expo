import { useUpdateProfile } from './useUpdateProfile';

export const useUpdateUnitSystem = () => {
  const { mutate: updateProfile } = useUpdateProfile();

  return {
    updateUnitSystem: (unitSystem: 'metric' | 'imperial') => {
      updateProfile({ field: 'unitSystem', value: unitSystem });
    },
  };
};
