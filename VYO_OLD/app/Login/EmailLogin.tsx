import { View, Text, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions, Animated, Keyboard, StyleSheet } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonRounded from '../_components/ui/ButtonRounded';
import Input from '../_components/ui/Input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSignIn } from '../_hooks/useSupabaseAuth';
import { loginSchema, LoginFormData } from '../_types/validationSchemas'
import { Props } from '../_types/props';
import { typography, globalStyles } from '../../styles/globalStyles';

export default function EmailLogin({ navigation }: Props<'EmailLogin'>) {
    const { signIn, loading: isPending } = useSignIn();
    const overlayOpacity = useRef(new Animated.Value(0)).current; 
    const [keyboardOffset, setKeyboardOffset] = useState(Dimensions.get('window').height * 0.25);
    
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
        const result = await signIn(data.email, data.password);
        
        if (result.success) {
            console.log('✅ Login successful, navigating to Privacy');
            navigation.navigate('Privacy');
        } else {
            console.error('❌ Login error:', result.error || 'Failed to login');
            // TODO: Show error message to user
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
                    source={require('../../assets/images/login.png')} 
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
            
            <View style={styles.content}>
                <Text style={[typography.h1, styles.title]}>Welcome back, dear</Text>

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
                    onPress={() => navigation.navigate('EmailResetPassword')}
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
                    onPress={() => navigation.navigate('EmailRegistration')}
                >
                    <Text style={[typography.p, styles.signUpText]}>Don't have an account?</Text>
                    <Text style={[typography.p, globalStyles.textLink, styles.signUpLink]}>Sign up</Text>
                </TouchableOpacity>
            </View>
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
        paddingTop: 80, // pt-20
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
        paddingTop: 40, // pt-10
        paddingHorizontal: 16, // px-4
    },
    title: {
        marginBottom: 16, // mb-4
    },

    inputBox: {
        position: 'relative',
    },
    errorText: {
        position: 'absolute',
        bottom: -24, // -bottom-6
        color: '#EF4444', // text-red-500
        fontSize: 14, // text-sm
        marginTop: 4, // mt-1
        fontFamily: 'Geologica',
    },
    errorTextPassword: {
        marginTop: 4, // mt-1
        color: '#EF4444', // text-red-500
        fontSize: 14, // text-sm
        fontFamily: 'Geologica',
    },
    forgotPassword: {
        marginTop: 4, // mt-1
        marginBottom: 24, // mb-6
    },
    forgotPasswordText: {
        fontWeight: '500',
    },
    signUpContainer: {
        flexDirection: 'row',
        marginTop: 24, // mt-6
        gap: 4, // gap-1
        justifyContent: 'center',
    },
    signUpText: {
        // p class
    },
    signUpLink: {
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
});