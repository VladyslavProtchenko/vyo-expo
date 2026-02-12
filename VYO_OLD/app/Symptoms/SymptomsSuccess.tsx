import { View, Text } from 'react-native'
import { typography } from '../../styles/globalStyles'
import ButtonGradient from '../_components/ui/ButtonGradient'
import LottieView from 'lottie-react-native';
import { useRef, useEffect } from 'react';

export default function SymptomsSuccess({navigation}: {navigation: any}) {
  const fire1Ref = useRef<LottieView>(null);
  const fire2Ref = useRef<LottieView>(null);
  const fire3Ref = useRef<LottieView>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      fire1Ref.current?.play();
    }, 0);

    const timer2 = setTimeout(() => {
      fire2Ref.current?.play();
    }, 300);

    const timer3 = setTimeout(() => {
      fire3Ref.current?.play();
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <View style={{flex: 1, paddingTop: 60, alignItems: 'center', padding: 16}}>
      <LottieView
        source={require('../../assets/animations/fire.json')}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
      <Text style={[typography.h1, {marginBottom: 16}]}>Nice job! </Text>
      <Text style={[typography.p, { textAlign: 'center', marginBottom: 16}]}>Your body speaks — and you're learning to hear it. Keep going!</Text>
      <View style={{ flexDirection: 'row', gap: 16 , marginTop: 32}}>
        <LottieView
          ref={fire1Ref}
          source={require('../../assets/animations/fire.json')}
          loop
          style={{ width: 50, height: 50 }}
        />
        <LottieView
          ref={fire2Ref}
          source={require('../../assets/animations/fire.json')}
          loop
          style={{ width: 50, height: 50 }}
        />
        <LottieView
          ref={fire3Ref}
          source={require('../../assets/animations/fire.json')}
          loop
          style={{ width: 50, height: 50 }}
        />
      </View>
      <Text style={{ textAlign: 'center', marginBottom: 32}}>3 days streak</Text>
      <ButtonGradient
        title="Go Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}