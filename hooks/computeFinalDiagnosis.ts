import { getEndoCluster } from './getEndo';
import { getPCOS } from './getPCOS';
import { getPrimaryDysmenorrhea } from './getPrimaryDysmenorrhea';
import { OnboardingData } from './useOnboardingData';

type PCOSType = 'high' | 'middle' | 'possible';

type DiagnosisPayload =
  | { diagnosis: 'normal' }
  | { diagnosis: 'dysmenorrhea' }
  | { diagnosis: 'pcos'; pcos_type: PCOSType }
  | { diagnosis: 'endometriosis'; endo_type: number; is_endo_surgery: boolean; is_endo_additional: boolean };

type DiagnosisContext =
  | { exitStep: 7 }
  | { exitStep: 10 }
  | { exitStep: 11; surgery: string; otherSymptoms: string[] };

type DiagnosisOutput =
  | { action: 'continue_to_step_11' }
  | { action: 'finalize'; payload: DiagnosisPayload };

function pcosPayload(pcosResult: number): DiagnosisPayload {
  const pcosType: PCOSType = pcosResult === 1 ? 'high' : pcosResult === 2 ? 'middle' : 'possible';
  return { diagnosis: 'pcos', pcos_type: pcosType };
}

/**
 * Unified diagnosis computation for all onboarding exit points.
 *
 * Step 7 (no pain)  — only PCOS check, no pain data available
 * Step 10           — runs getPrimaryDysmenorrhea; if endo → continue to Step 11, else finalize
 * Step 11           — final: surgery → endo cluster; no surgery → PCOS check, then endo cluster
 */
export function computeFinalDiagnosis(
  data: OnboardingData | null | undefined,
  context: DiagnosisContext,
): DiagnosisOutput {
  if (!data?.profile || !data?.medical) {
    return { action: 'finalize', payload: { diagnosis: 'normal' } };
  }

  // Step 7: user has no pain → only PCOS is relevant
  if (context.exitStep === 7) {
    const pcosResult = getPCOS(data);
    return {
      action: 'finalize',
      payload: pcosResult > 0 ? pcosPayload(pcosResult) : { diagnosis: 'normal' },
    };
  }

  // Step 10: check if user needs endo sub-typing (Step 11)
  if (context.exitStep === 10) {
    const hasDiagnosedEndo = data?.medical?.diagnosed_conditions?.some(
      (c) => c === 'Endometriosis' || c === 'Adenomyosis',
    );

    if (hasDiagnosedEndo) {
      return { action: 'continue_to_step_11' };
    }

    const dysmenorrheaResult = getPrimaryDysmenorrhea(data);

    if (dysmenorrheaResult === 'endometriosis') {
      return { action: 'continue_to_step_11' };
    }

    // Not endo — check PCOS, then use dysmenorrhea/normal result
    const pcosResult = getPCOS(data);
    return {
      action: 'finalize',
      payload: pcosResult > 0
        ? pcosPayload(pcosResult)
        : { diagnosis: dysmenorrheaResult as 'dysmenorrhea' | 'normal' },
    };
  }

  // Step 11: final diagnosis with surgery context
  const { surgery, otherSymptoms } = context;
  const mergedData: OnboardingData = {
    profile: data?.profile ?? null,
    medical: data?.medical ? { ...data.medical, other_symptoms: otherSymptoms } : null,
  };

  if (surgery !== 'None of these') {
    return {
      action: 'finalize',
      payload: {
        diagnosis: 'endometriosis',
        endo_type: getEndoCluster(mergedData),
        is_endo_surgery: true,
        is_endo_additional: false,
      },
    };
  }

  // No surgery — check PCOS first
  const pcosResult = getPCOS(data);
  if (pcosResult > 0) {
    return { action: 'finalize', payload: pcosPayload(pcosResult) };
  }

  // Default: endometriosis with cluster sub-typing
  return {
    action: 'finalize',
    payload: {
      diagnosis: 'endometriosis',
      endo_type: getEndoCluster(mergedData),
      is_endo_surgery: false,
      is_endo_additional: otherSymptoms.length > 0,
    },
  };
}
