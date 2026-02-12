import ButtonRounded from '@/components/ui/ButtonRounded';
import Input from '@/components/ui/Input';
import { globalStyles, typography } from '@/constants/typography';
import { useSignIn } from '@/hooks/useSupabaseAuth';
import { LoginFormData, loginSchema } from '@/types/validationSchemas';
import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Animated, Dimensions, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EmailLogin() {
    const router = useRouter();
    const { signIn, loading: isPending } = useSignIn();
    const overlayOpacity = useRef(new Animated.Value(0)).current; 
    const [keyboardOffset, setKeyboardOffset] = useState(Dimensions.get('window').height * 0.25);
    const [errorMessage, setErrorMessage] = useState('');
    
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: { email: '', password: '' }
    });

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => 
            Animated.timing(overlayOpacity, { 
                toValue: 1,  
                duration: 100, 
                useNativeDriver: true,  
            }).start()
        );
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => 
            Animated.timing(overlayOpacity, { 
                toValue: 0, 
                duration: 100, 
                useNativeDriver: true, 
            }).start()
        );

        return () => {
            keyboardDidShowListener?.remove();
            keyboardDidHideListener?.remove();
        };
    }, [overlayOpacity]);

    const onSubmit = async (data: LoginFormData) => {
        setErrorMessage('');
        const result = await signIn(data.email, data.password);
        
        if (result.success) {
            console.log('✅ Login successful, navigating to Privacy');
            router.push('/privacy' as any);
        } else {
            console.error('❌ Login error:', result.error || 'Failed to login');
            setErrorMessage(result.error || 'Failed to login');
        }
    };

  return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keyboardOffset}
        >
            <View style={styles.imageContainer}>
                <ImageBackground 
                    source={require('@/assets/images/login.png')} 
                    resizeMode="cover" 
                    style={styles.backgroundImage}
                />
                <Animated.View 
                    style={[
                        styles.overlay,
                        { opacity: overlayOpacity }
                    ]}
                />
            </View>
            
            <ScrollView 
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={[typography.h1, styles.title]}>Welcome back, dear</Text>

                {errorMessage ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    </View>
                ) : null}

                <View>
                    <View style={[styles.inputBox, { marginBottom: 24 }]}> 
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
                                />
                            )}
                        />
                        {errors.email && (
                            <Text style={styles.errorText}>{errors.email.message}</Text>
                        )}
                    </View> 
                    
                    <View style={styles.inputBox}> 
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
                                />
                            )}
                        />
                    </View>
                    {errors.password && (
                        <Text style={styles.errorTextPassword}>{errors.password.message}</Text>
                    )}

                </View>

                <TouchableOpacity 
                    style={styles.forgotPassword} 
                    onPress={() => router.push('/email-reset-password' as any)}
                >
                    <Text style={[typography.p, globalStyles.textLink, styles.forgotPasswordText]}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>

                <ButtonRounded
                    title='Login'
                    icon={(<MaterialIcons name="trending-flat" size={28} color="white" />)}
                    type='black'
                    onPress={handleSubmit(onSubmit)}
                    iconLeft={false}
                    enabled={!isPending && isValid}
                />

                <TouchableOpacity 
                    style={styles.signUpContainer} 
                    onPress={() => router.push('/email-registration' as any)}
                >
                    <Text style={[typography.p, styles.signUpText]}>Don't have an account?</Text>
                    <Text style={[typography.p, globalStyles.textLink, styles.signUpLink]}>Sign up</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        backgroundColor: 'white',
        width: '100%',
    },
    imageContainer: {
        flex: 0.4,
        width: '100%',
        position: 'relative',
    },
    backgroundImage: {
        width: '100%',
        flex: 1,
    alignItems: 'center',
        paddingTop: 80,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
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
        marginBottom: 16,
    },
    errorContainer: {
        backgroundColor: '#FEE2E2',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    errorMessage: {
        color: '#DC2626',
        fontSize: 14,
        fontFamily: 'Poppins',
        textAlign: 'center',
    },

    inputBox: {
        position: 'relative',
    },
    errorText: {
        position: 'absolute',
        bottom: -24,
        color: '#EF4444',
        fontSize: 14,
        marginTop: 4,
        fontFamily: 'Poppins',
    },
    errorTextPassword: {
        marginTop: 4,
        color: '#EF4444',
        fontSize: 14,
        fontFamily: 'Poppins',
    },
    forgotPassword: {
        marginTop: 4,
        marginBottom: 24,
    },
    forgotPasswordText: {
        fontWeight: '500',
    },
    signUpContainer: {
        flexDirection: 'row',
        marginTop: 24,
        gap: 4,
        justifyContent: 'center',
    },
    signUpText: {
    },
    signUpLink: {
        textDecorationLine: 'underline',
        fontWeight: '500',
  },
});
