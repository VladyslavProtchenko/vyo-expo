import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../_types/types.ts';
import Step1 from './steps/Step_1.tsx';
import Step2 from './steps/Step_2.tsx';
import Step3 from './steps/Step_3.tsx';
import Step4 from './steps/Step_4.tsx';
import Step5 from './steps/Step_5.tsx';
import Step6 from './steps/Step_6.tsx';
import Step7 from './steps/Step_7.tsx';
import Step8 from './steps/Step_8.tsx';
import Step9 from './steps/Step_9.tsx';
import Progress from '../_components/Progress.tsx';
import Step1_2 from './steps/Step_1.2.tsx';
type Props = NativeStackScreenProps<RootStackParamList, 'CompleteProfile'>;


export default function CompleteProfile({ navigation }: Props) {
  const [step, setStep] = useState(1);

  const goBack  = () => {
    if (step === 1) {
      navigation.goBack();
    }
    setStep(step - 1);
  }
  return (
    <View style={styles.container}>
      <Progress 
        percentage={(step-1)/9*100} 
        isSkip={step !== 1} 
        goBack={goBack} 
        navigation={navigation}
      /> 
      {step === 1 && <Step1 goNext={() => setStep(2)} />}
      {step === 2 && <Step1_2 goNext={() => setStep(3)} />}
      {step === 3 && <Step2 goNext={() => setStep(4)} />}
      {step === 4 && <Step3 goNext={() => setStep(5)} />}
      {step === 5 && <Step4 goNext={() => setStep(6)} />}
      {step === 6 && <Step5 goNext={() => setStep(7)} navigation={navigation} />}
      {step === 7 && <Step6 goNext={() => setStep(8)} />}
      {step === 8 && <Step7 goNext={() => setStep(9)} />}
      {step === 9 && <Step8 goNext={() => setStep(10)} />}
      {step === 10 && <Step9 goNext={() => navigation.navigate('SyncData')} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: 'white',
  },
});