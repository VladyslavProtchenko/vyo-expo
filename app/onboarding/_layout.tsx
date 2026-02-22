import { Stack } from 'expo-router';
import React from 'react';

const steps = Array.from({ length: 11 }, (_, i) => `step-${i + 1}`);

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {steps.map((step) =>  <Stack.Screen key={step} name={step as any} />)}
    </Stack>
  );
}
