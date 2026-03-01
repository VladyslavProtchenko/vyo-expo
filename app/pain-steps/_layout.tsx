import { useOnboardingData } from '@/hooks/useOnboardingData';
import { Stack } from 'expo-router';
import React from 'react';

const steps = Array.from({ length: 4 }, (_, i) => `step-${i + 1}`);

export default function PainStepsLayout() {
  useOnboardingData();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {steps.map((step) => <Stack.Screen key={step} name={step as any} />)}
    </Stack>
  );
}
