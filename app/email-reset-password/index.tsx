import ButtonRounded from '@/components/ui/ButtonRounded';
import Input from '@/components/ui/Input';
import { typography } from '@/constants/typography';
import { useResetPassword, useVerifyOTP } from '@/hooks/useSupabaseAuth';
import { CodeFormData, codeSchema, EmailFormData, emailSchema } from '@/types/validationSchemas';
import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EmailResetPassword() {
    const router = useRouter();
    const { sendOTP, loading: isSendingOTP } = useResetPassword();
    const { verifyCode, loading: isVerifying } = useVerifyOTP();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [codeSent, setCodeSent] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

    const emailForm = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        mode: 'onChange',
        defaultValues: { email: '' }
    });

    const codeForm = useForm<CodeFormData>({
        resolver: zodResolver(codeSchema),
        mode: 'onChange',
        defaultValues: { code: '' }
    });

    // Auto-verify when code is valid (6 digits)
    useEffect(() => {
        if (codeSent && codeForm.formState.isValid && !isVerifying) {
            const values = codeForm.getValues();
            if (values.code && values.code.length === 6) {
                onCodeSubmit(values);
            }
        }
    }, [codeForm.formState.isValid, codeSent]);

    // Timer countdown
    useEffect(() => {
        if (resendTimer > 0) {
            const interval = setInterval(() => {
                setResendTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [resendTimer]);

    const onEmailSubmit = async (data: EmailFormData) => {
        setSubmitError(null);
        const result = await sendOTP(data.email);
        
        if (result.success) {
            console.log('Verification code sent to your email!');
            setCodeSent(true);
            setUserEmail(data.email);
            setResendTimer(60);
        } else {
            setSubmitError(result.error || 'Failed to send code. Please try again.');
            console.error('Failed to send verification code.', result.error);
        }
    };

    const onResendCode = async () => {
        if (resendTimer > 0) return;
        
        setSubmitError(null);
        const result = await sendOTP(userEmail);
        
        if (result.success) {
            console.log('Verification code resent!');
            setResendTimer(60);
            codeForm.reset();
        } else {
            setSubmitError(result.error || 'Failed to resend code.');
        }
    };

    const onCodeSubmit = async (data: CodeFormData) => {
        setSubmitError(null);
        const result = await verifyCode(userEmail, data.code);
        
        if (result.success) {
            console.log('Code verified! Redirecting to new password page...');
            router.push({
                pathname: '/new-password' as any,
                params: { email: userEmail }
            });
        } else {
            setSubmitError(result.error || 'Invalid code. Please try again.');
            console.error('Failed to verify code.', result.error);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ImageBackground 
                source={require('@/assets/images/ResetPassword.png')} 
                resizeMode="cover" 
                style={styles.backgroundImage}
            />
            <ScrollView 
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={[typography.h1, styles.title]}>Reset password</Text>
                <Text style={[typography.p, styles.subtitle]}>
                    {!codeSent 
                        ? 'Enter your email and we will send you a 6-digit verification code to reset your password.'
                        : `Enter the 6-digit code sent to ${userEmail}`
                    }
                </Text>
                
                <View style={styles.inputContainer}>
                    <Controller
                        control={emailForm.control}
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
                    {emailForm.formState.errors.email && (
                        <Text style={styles.errorText}>
                            {emailForm.formState.errors.email.message}
                        </Text>
                    )}
                </View>

                {codeSent && (
                    <View style={styles.inputContainer}>
                        <Controller
                            control={codeForm.control}
                            name="code"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    type='number-pad'
                                    placeholder='6-digit code'
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        {codeForm.formState.errors.code && (
                            <Text style={styles.errorText}>
                                {codeForm.formState.errors.code.message}
                            </Text>
                        )}
                        {isVerifying && (
                            <Text style={styles.verifyingText}>Verifying code...</Text>
                        )}
                    </View>
                )}

                {submitError && (
                    <Text style={[styles.errorText, styles.submitError]}>
                        {submitError}
                    </Text>
                )}
                
                {!codeSent ? (
                    <ButtonRounded
                        title='Send Code'
                        icon={(<MaterialIcons name="trending-flat" size={28} color="white" />)}
                        type='black'
                        onPress={emailForm.handleSubmit(onEmailSubmit)}
                        iconLeft={false}
                        enabled={!isSendingOTP && emailForm.formState.isValid}
                    />
                ) : (
                    <TouchableOpacity 
                        style={[styles.resendButton, resendTimer > 0 && styles.resendButtonDisabled]} 
                        onPress={onResendCode}
                        disabled={resendTimer > 0}
                    >
                        <MaterialIcons 
                            name="refresh" 
                            size={20} 
                            color={resendTimer > 0 ? '#9CA3AF' : '#0020C399'} 
                        />
                        <Text style={[styles.resendText, resendTimer > 0 && styles.resendTextDisabled]}>
                            {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend code'}
                        </Text>
                    </TouchableOpacity>
                )}
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
    backgroundImage: {
        flex: 0.33,
        width: '100%',
        paddingTop: 80,
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
        width: '100%',
        marginBottom: 24,
    },
    inputContainer: {
        marginBottom: 24,
    },
    errorText: {
        color: '#EF4444',
        fontSize: 14,
        marginTop: 4,
        fontFamily: 'Poppins',
    },
    submitError: {
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        marginBottom: 24,
    },
    verifyingText: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: '#0020C399',
        marginTop: 8,
        opacity: 0.8,
    },
    resendButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
    },
    resendButtonDisabled: {
        opacity: 0.5,
    },
    resendText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        color: '#0020C399',
        fontWeight: '600',
    },
    resendTextDisabled: {
        color: '#9CA3AF',
    },
});
