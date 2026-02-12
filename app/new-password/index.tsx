import ButtonRounded from '@/components/ui/ButtonRounded';
import Input from '@/components/ui/Input';
import { typography } from '@/constants/typography';
import { useUpdatePassword } from '@/hooks/useSupabaseAuth';
import { PasswordFormData, passwordSchema } from '@/types/validationSchemas';
import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function NewPassword() {
    const router = useRouter();
    const { email } = useLocalSearchParams<{ email: string }>();
    const { updatePassword, loading: isPending } = useUpdatePassword();
    const [keyboardOffset, setKeyboardOffset] = useState(20);
    const [submitError, setSubmitError] = useState<string | null>(null);
    
    const passwordForm = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        mode: 'onChange',
        defaultValues: { password: '', confirmPassword: '' }
    });

    const onPasswordSubmit = async (data: PasswordFormData) => {
        setSubmitError(null);
        const result = await updatePassword(data.password);
        
        if (result.success) {
            console.log('Password changed successfully!');
            router.push('/email-login' as any);
        } else {
            setSubmitError(result.error || 'Failed to change password. Please try again.');
            console.error('Failed to change password.', result.error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageBackground 
                    source={require('@/assets/images/ResetPassword.png')} 
                    resizeMode="cover" 
                    style={styles.backgroundImage}
                />
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={keyboardOffset}
                style={styles.keyboardView}
            >
                <ScrollView 
                    style={styles.content}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={[typography.h1, styles.title]}>Reset password</Text>
                    <Text style={[typography.p, styles.subtitle]}>
                        Enter your new password for {email || 'your account'}
                    </Text>
                    
                    <View style={styles.inputsContainer}>
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
                            <Text style={styles.helperText}>
                                Minimum 8 characters
                            </Text>
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
                    </View>

                    {submitError && (
                        <Text style={[styles.errorText, styles.submitError]}>
                            {submitError}
                        </Text>
                    )}
                    
                    <ButtonRounded
                        title='Save Changes'
                        icon={(<MaterialIcons name="trending-flat" size={28} color="white" />)}
                        type='black'
                        onPress={passwordForm.handleSubmit(onPasswordSubmit)}
                        iconLeft={false}
                        enabled={!isPending && passwordForm.formState.isValid}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
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
    keyboardView: {
        flex: 1,
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
    inputsContainer: {
        marginBottom: 24,
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
        opacity: 0.7,
    },
});
