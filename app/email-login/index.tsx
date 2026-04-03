import ButtonRounded from '@/components/ui/ButtonRounded';
import Input from '@/components/ui/Input';
import { supabase } from '@/config/supabase';
import { AppColors } from '@/constants/theme';
import { globalStyles, typography } from '@/constants/typography';
import { useLoadUserData } from '@/hooks/useLoadUserData';
import { useSignIn } from '@/hooks/useSupabaseAuth';
import { LoginFormData, loginSchema } from '@/types/validationSchemas';
import { ArrowRight } from 'lucide-react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function EmailLogin() {
    const router = useRouter();
    const { signIn, loading: isPending } = useSignIn();
    const { refetch: loadUserData } = useLoadUserData();
    const [errorMessage, setErrorMessage] = useState('');

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (data: LoginFormData) => {
        setErrorMessage('');
        const result = await signIn(data.email, data.password);

        if (result.success) {
            await loadUserData();

            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data: profile } = await supabase
                .from('profiles')
                .select('onboarding_completed')
                .eq('id', session.user.id)
                .single();

            router.replace(profile?.onboarding_completed ? '/(tabs)/home' as any : '/onboarding/step-1' as any);
        } else {
            setErrorMessage(result.error || 'Failed to login');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ImageBackground
                source={require('@/assets/images/login.png')}
                resizeMode="cover"
                style={styles.image}
            />

            <View style={[styles.form, styles.formContent]}>
                <Text style={[typography.h1, styles.title]}>Welcome back, dear</Text>

                {errorMessage ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    </View>
                ) : null}

                <View style={styles.inputBox}>
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
                    {errors.password && (
                        <Text style={styles.errorTextPassword}>{errors.password.message}</Text>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={() => router.push('/email-reset-password' as any)}
                >
                    <Text style={[typography.p, globalStyles.textLink]}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>

                <ButtonRounded
                    title='Login'
                    icon={<ArrowRight size={28} color="white" />}
                    type='black'
                    onPress={handleSubmit(onSubmit)}
                    iconLeft={false}
                    enabled={!isPending && isValid}
                />

                <TouchableOpacity
                    style={styles.signUpContainer}
                    onPress={() => router.push('/email-registration' as any)}
                >
                    <Text style={typography.p}>Don't have an account?</Text>
                    <Text style={[typography.p, globalStyles.textLink, styles.signUpLink]}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.white,
    },
    image: {
        flex: 1,
        maxHeight: SCREEN_HEIGHT / 3,
    },
    form: {
        flex: 2,
    },
    formContent: {
        paddingTop: 40,
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    title: {
        marginBottom: 16,
    },
    errorContainer: {
        backgroundColor: AppColors.errorBackground,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    errorMessage: {
        color: AppColors.errorDark,
        fontSize: 14,
        fontFamily: 'Poppins',
        textAlign: 'center',
    },
    inputBox: {
        position: 'relative',
        marginBottom: 24,
    },
    errorText: {
        position: 'absolute',
        bottom: -20,
        color: AppColors.error,
        fontSize: 12,
        fontFamily: 'Poppins',
    },
    errorTextPassword: {
        marginTop: 4,
        color: AppColors.error,
        fontSize: 12,
        fontFamily: 'Poppins',
    },
    forgotPassword: {
        marginTop: 4,
        marginBottom: 24,
    },
    signUpContainer: {
        flexDirection: 'row',
        marginTop: 24,
        gap: 4,
        justifyContent: 'center',
    },
    signUpLink: {
        textDecorationLine: 'underline',
        fontWeight: '500',
    },
});
