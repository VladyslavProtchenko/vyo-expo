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
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, ImageBackground, Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function EmailLogin() {
    const router = useRouter();
    const { signIn, loading: isPending } = useSignIn();
    const { refetch: loadUserData } = useLoadUserData();

    const { control, handleSubmit, setError, formState: { errors, isValid } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (data: LoginFormData) => {
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
            const message = result.error || 'Failed to login';
            setError('email', { type: 'email-address', message });
            Toast.show({
                type: 'error',
                text1: 'Login failed',
                text2: message,
            });
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
                                error={errors.email ? { type: 'email-address', message: errors.email.message || '' } : null}
                            />
                        )}
                    />
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
    inputBox: {
        position: 'relative',
        marginBottom: 24,
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
