import { View, Text, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonRounded from '../_components/ui/ButtonRounded';
import Input from '../_components/ui/Input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCreate } from '../_hooks/useTestRequest';
import { PasswordFormData, passwordSchema } from '../_types/validationSchemas';
import { Props } from '../_types/props';
import { typography } from '../../styles/globalStyles';

export default function NewPassword({ navigation }: Props<'NewPassword'>) {
    const { mutate: sendRequest, isPending } = useCreate();
    const [keyboardOffset, setKeyboardOffset] = useState(20);
    
    const passwordForm = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        mode: 'onChange',
        defaultValues: { password: '', confirmPassword: '' }
    });

    const onPasswordSubmit = () => {
        sendRequest(undefined, {
            onSuccess: () => {
                console.log('Password changed successfully!');
                navigation.navigate('EmailLogin');
            },
            onError: () => {
                console.error('Failed to change password. Please try again.');
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageBackground 
                    source={require('../../assets/images/ResetPassword.png')} 
                    resizeMode="cover" 
                    style={styles.backgroundImage}
                />
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={keyboardOffset}
            >
                <View style={styles.content}>
                    <Text style={[typography.h1, styles.title]}>Reset password</Text>
                    
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
                    
                    <ButtonRounded
                        title='Save Changes'
                        icon={(<MaterialIcons name="trending-flat" size={28} color="white" />)}
                        type='black'
                        onPress={passwordForm.handleSubmit(onPasswordSubmit)}
                        iconLeft={false}
                        enabled={!isPending && passwordForm.formState.isValid}
                    />
                </View>
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
        flex: 0.4, // h-2/6 equivalent
        width: '100%',
        position: 'relative',
    },
    backgroundImage: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        paddingTop: 80, // pt-20
    },
    content: {
        paddingTop: 40, // pt-10
        paddingHorizontal: 16, // px-4
    },
    title: {
        width: '100%',
        marginBottom: 24, // mb-6
    },
    inputsContainer: {
        marginBottom: 24, // mb-6
    },
    inputWrapper: {
        marginBottom: 16, // mb-4
    },
    helperText: {
        fontSize: 12, // text-[12px]
        marginTop: 8, // mt-2
        opacity: 0.6,
        fontFamily: 'Geologica',
        fontWeight: '300',
    },
    errorText: {
        color: '#EF4444', // text-red-500
        fontSize: 14, // text-sm
        marginTop: 4, // mt-1
        fontFamily: 'Geologica',
    },
});