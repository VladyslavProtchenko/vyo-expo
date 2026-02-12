import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function CompleteProfile() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/onboarding/step-1' as any);
  }, []);

  return null;
}
