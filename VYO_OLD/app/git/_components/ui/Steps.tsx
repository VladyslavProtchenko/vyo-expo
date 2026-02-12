import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';

interface IProps {
    className?:string;
    activeStep?:number;
    isWhite?: boolean;
}
export default function Steps({className, activeStep, isWhite = false}: IProps) {
    const steps = [1,2,3,4,5]

  return (
    <View className={`w-full flex-row  justify-between items-center px-6 ${className}`}>
        {!isWhite ? <FontAwesome6 name="arrow-left-long" size={24} color="white" className='font-thin' />: <View style={{width: 24}}></View> }
        <View className='gap-2.5 flex-row'>
            {steps.map(item => (
                <View key={item} className={`h-1 w-8 ${isWhite? 'bg-white' : 'bg-black'} opacity-60 rounded-full ${item === activeStep && ' opacity-100 ' }`}/>
            ))}
        </View>
        <View style={{width: 24}}></View>
    </View>
  )
}