import ButtonRounded from '@/components/ui/ButtonRounded';
import Input from '@/components/ui/Input';
import { AppColors } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { useUpdatePassword } from '@/hooks/useSupabaseAuth';
import { PasswordFormData, passwordSchema } from '@/types/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function NewPassword() {
    const router = useRouter();
    const { email } = useLocalSearchParams<{ email: string }>();
    const { updatePassword, loading: isPending } = useUpdatePassword();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const passwordForm = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        mode: 'onChange',
        defaultValues: { password: '', confirmPassword: '' },
    });

    const onPasswordSubmit = async (data: PasswordFormData) => {
        setSubmitError(null);
        const result = await updatePassword(data.password);

        if (result.success) {
            router.push('/email-login' as any);
        } else {
            const message = result.error || 'Failed to change password. Please try again.';
            setSubmitError(message);
            Toast.show({ type: 'error', text1: 'Failed to change password', text2: message });
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ImageBackground
                source={require('@/assets/images/ResetPassword.webp')}
                resizeMode="cover"
                style={styles.image}
            />

            <View style={styles.form}>
                <Text style={[typography.h1, styles.title]}>Reset password</Text>
                <Text style={[typography.p, styles.subtitle]}>
                    Enter your new password for {email || 'your account'}
                </Text>

                <View style={styles.inputWrapper}>
                    <Controller
                        control={passwordForm.control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                type='password'
                                placeholder='New Password'
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                isPassword={true}
                            />
                        )}
                    />
                    <Text style={styles.helperText}>Minimum 8 characters</Text>
                    {passwordForm.formState.errors.password && (
                        <Text style={styles.errorText}>
                            {passwordForm.formState.errors.password.message}
                        </Text>
                    )}
                </View>

                <View style={styles.inputWrapper}>
                    <Controller
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                type='password'
                                placeholder='Confirm Password'
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                isPassword={true}
                            />
                        )}
                    />
                    {passwordForm.formState.errors.confirmPassword && (
                        <Text style={styles.errorText}>
                            {passwordForm.formState.errors.confirmPassword.message}
                        </Text>
                    )}
                </View>

                {submitError && (
                    <Text style={[styles.errorText, styles.submitError]}>{submitError}</Text>
                )}

                <ButtonRounded
                    title='Save Changes'
                    icon={<ArrowRight size={28} color="white" />}
                    type='black'
                    onPress={passwordForm.handleSubmit(onPasswordSubmit)}
                    iconLeft={false}
                    enabled={!isPending && passwordForm.formState.isValid}
                />
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
        paddingTop: 40,
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    title: {
        marginBottom: 24,
    },
    subtitle: {
        marginBottom: 24,
        opacity: 0.7,
    },
    inputWrapper: {
        marginBottom: 16,
    },
    helperText: {
        fontSize: 12,
        marginTop: 8,
        opacity: 0.6,
        fontFamily: 'Poppins',
        fontWeight: '300',
    },
    errorText: {
        color: AppColors.error,
        fontSize: 14,
        marginTop: 4,
        fontFamily: 'Poppins',
    },
    submitError: {
        marginBottom: 16,
        textAlign: 'center',
    },
});
