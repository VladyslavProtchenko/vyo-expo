import { View, Text, ImageBackground, ScrollView, KeyboardAvoidingView, Platform, Dimensions, Animated, Keyboard, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../_types/types';
import ButtonRounded from '../_components/ui/ButtonRounded';
import Input from '../_components/ui/Input';
import { useSignUp } from '../_hooks/useSupabaseAuth';
import { supabase } from '../_config/supabase';
import { registrationSchema, RegistrationFormData } from '../_types/validationSchemas';
import { typography, globalStyles } from '../../styles/globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'EmailRegistration'>;

export default function SignUp({ navigation }: Props) {
    const { signUp, loading: isPending } = useSignUp();
    const screenHeight = Dimensions.get('window').height;
    const imageHeight = useRef(new Animated.Value(screenHeight * 0.25)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;
    
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        mode: 'onChange',
        defaultValues: { 
            name: '', 
            email: '', 
            password: '' 
        }
    });

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            Animated.parallel([
                Animated.timing(imageHeight, {
                    toValue: 20,
                    duration: 250,
                    useNativeDriver: false,
                }),
                Animated.timing(overlayOpacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start();
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            Animated.parallel([
                Animated.timing(imageHeight, {
                    toValue: screenHeight * 0.25,
                    duration: 250,
                    useNativeDriver: false,
                }),
                Animated.timing(overlayOpacity, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start();
        });

        return () => {
            keyboardDidShowListener?.remove();
            keyboardDidHideListener?.remove();
        };
    }, [imageHeight, overlayOpacity, screenHeight]);

    const onSubmit = async (data: RegistrationFormData) => {
        const result = await signUp(data.email, data.password);
        
        if (result.success) {
            console.log('✅ Registration successful');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check session (Supabase v1)
            const session = supabase.auth.session();
            console.log('📱 Session after signup:', session ? 'EXISTS' : 'NULL');
            
            navigation.navigate('Privacy');
        } else {
            console.error('❌ Registration failed:', result.error);
            // TODO: Show error message to user
        }
    };


    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={10}
        >
            <Animated.View style={[styles.imageContainer, { height: imageHeight }]}>
                <ImageBackground 
                    source={require('../../assets/images/sign-up.png')} 
                    resizeMode="cover" 
                    style={styles.backgroundImage}
                />
                <Animated.View 
                    style={[
                        styles.overlay,
                        { opacity: overlayOpacity }
                    ]}
                />
            </Animated.View>
            <ScrollView style={styles.content}>
                <Text style={[typography.h1, styles.title]}>You deserve the best</Text>

                <View style={styles.inputsContainer}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                type='email-address'
                                placeholder='Name'
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={errors.name ? { type: 'name', message: errors.name.message || 'Name is required' } : null}
                            />
                        )}
                    />
                    
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                type='email-address'
                                placeholder='Email'
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={errors.email ? { type: 'email', message: errors.email.message || 'Email is required' } : null}
                            />
                        )}
                    />
                   
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                type='password'
                                placeholder='Password'
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={errors.password ? { type: 'password', message: errors.password.message || 'Password is required' } : null}
                            />
                        )}
                    />
                </View>
                
                <Text style={[typography.p, styles.helperText, errors.password && styles.helperTextWithError]}>
                    Minimum 8 characters
                </Text>
                
                <View style={styles.bottomContainer}>
                    <Text style={[typography.p, styles.termsText]}>
                        By continuing, you agree for VYO
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                        <TouchableOpacity  style={{ paddingRight: 4 }} onPress={() => console.log('Terms & Conditions')}>
                            <Text style={[globalStyles.textLink, ]}>Terms & Conditions</Text>
                        </TouchableOpacity>
                        <Text style={[typography.p, styles.termsText]}>and</Text>
                        <TouchableOpacity  style={{ paddingLeft: 4 }} onPress={() => console.log('Privacy Policy')}>
                            <Text style={[globalStyles.textLink]}>Privacy Policy,</Text>
                        </TouchableOpacity>

                    </View>
                    <Text 
                        style={[typography.p, styles.termsText, { marginBottom: 24, marginTop: 4 }]}
                    >Ps, we'll never share your personal data</Text>
                    
                    <ButtonRounded
                        title='Create Account'
                        icon={(<MaterialIcons name="trending-flat" size={28} color="white" />)}
                        type='black'
                        onPress={handleSubmit(onSubmit)}
                        iconLeft={false}
                        enabled={!isPending && isValid}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        
        position: 'relative',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        paddingTop: 40, // pt-10
        paddingHorizontal: 16, // px-4
    },
    title: {
        marginBottom: 24, // mb-6
    },
    inputsContainer: {
        gap: 24, // gap-6
        marginBottom: 8, // mb-2
    },
    helperText: {
        opacity: 0.6,
    },
    helperTextWithError: {
        marginTop: 24, // mt-6
    },
    bottomContainer: {
        marginTop: 24, // mt-6
    },
    termsText: {
        fontSize: 14, // !text-[14px]
         // mb-6
    },
    termsLink: {
        textDecorationLine: 'underline',
        paddingHorizontal: 4,
    },
});