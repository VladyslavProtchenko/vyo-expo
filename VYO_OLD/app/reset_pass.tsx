import { View, Text, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonRounded from '@/components/ui/ButtonRounded';
import { router } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Input from '@/components/ui/Input';


export default function ResetPass() {
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');

  const [isPass, setIsPass] = useState(true);

  useEffect(() => {
    if (pass.length > 8) setIsPass(true)
  }, [pass])

  const handleBlur = () => {
    if (pass.length < 8) {
      setIsPass(false);
    } else {
      setIsPass(true); // Clear error if validation passes
    }
  };

  const resetPass = () => {
    if (!pass || pass.length < 8) return setIsPass(false);
    if (pass !== pass2) return;

    router.navigate('/preview')
  }

  return (
    <View className='flex-1 bg-white w-full'>
      <ImageBackground source={require('@/assets/images/resetPass.png')} resizeMode="cover" className='h-1/4 w-full items-center pt-20'>
        {/* <Image width={50} height={50} source={require('@/assets/images/Logo.png')} className='w-[48px] h-[47px]' /> */}
      </ImageBackground>
      <ScrollView className='p-6'>
        <Text className='font-archivo text-[36px] leading-[36px] w-full mb-6'>Reset password</Text>


      </ScrollView>
    </View>
  )
}