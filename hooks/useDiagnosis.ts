import { useOnboardingData } from "./useOnboardingData";
import { getPrimaryDysmenorrhea } from "./getPrimaryDysmenorrhea";

//PD - Primary dysmenorrhea
export const DIAGNOSIS = ['normal', 'PD', 'endometriosis', 'PCOS'] as const;

export const useDiagnosis = () => {
  const { data } = useOnboardingData();
  const diagnosis = getPrimaryDysmenorrhea(data);

  return { diagnosis };
};
