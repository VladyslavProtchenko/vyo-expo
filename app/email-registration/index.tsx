import ButtonRounded from '@/components/ui/ButtonRounded';
import Input from '@/components/ui/Input';
import { supabase } from '@/config/supabase';
import { globalStyles, typography } from '@/constants/typography';
import { useSignUp } from '@/hooks/useSupabaseAuth';
import { RegistrationFormData, registrationSchema } from '@/types/validationSchemas';
import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Animated, Dimensions, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EmailRegistration() {
    const router = useRouter();
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
            
            // Check session (Supabase v2)
            const { data: { session } } = await supabase.auth.getSession();
            console.log('📱 Session after signup:', session ? 'EXISTS' : 'NULL');
            
            router.push('/privacy' as any);
        } else {
            console.error('❌ Registration failed:', result.error);
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
                    source={require('@/assets/images/sign-up.png')} 
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
            <ScrollView 
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={[typography.h1, styles.title]}>You deserve the best</Text>

                <View style={styles.inputsContainer}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                type='default'
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
                                isPassword={true}
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
                        <TouchableOpacity style={{ paddingRight: 4 }} onPress={() => router.push('/privacy' as any)}>
                            <Text style={[globalStyles.textLink]}>Terms & Conditions</Text>
                        </TouchableOpacity>
                        <Text style={[typography.p, styles.termsText]}>and</Text>
                        <TouchableOpacity style={{ paddingLeft: 4 }} onPress={() => router.push('/privacy' as any)}>
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
    },
    contentContainer: {
        paddingTop: 40,
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    title: {
        marginBottom: 24,
    },
    inputsContainer: {
        gap: 24,
        marginBottom: 8,
    },
    helperText: {
        opacity: 0.6,
    },
    helperTextWithError: {
        marginTop: 24,
    },
    bottomContainer: {
        marginTop: 24,
    },
    termsText: {
        fontSize: 14,
    },
    termsLink: {
        textDecorationLine: 'underline',
        paddingHorizontal: 4,
    },
});
