import { View, Text, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonRounded from '../_components/ui/ButtonRounded';
import Input from '../_components/ui/Input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCreate } from '../_hooks/useTestRequest';
import { EmailFormData, emailSchema } from '../_types/validationSchemas';
import { Props } from '../_types/props';
import { typography } from '../../styles/globalStyles';

export default function EmailResetPassword({ navigation }: Props<'EmailResetPassword'>) {
    const { mutate: sendRequest, isPending } = useCreate();

    const emailForm = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        mode: 'onChange',
        defaultValues: { email: '' }
    });

    const onEmailSubmit = () => {
        sendRequest(undefined, {
            onSuccess: () => {
                console.log('Password reset code sent to your email!');
                navigation.navigate('NewPassword');
            },
            onError: () => {
                console.error('Failed to send reset code. Please try again.');
            }
        });
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ImageBackground 
                source={require('../../assets/images/ResetPassword.png')} 
                resizeMode="cover" 
                style={styles.backgroundImage}
            />
            <View style={styles.content}>
                <Text style={[typography.h1, styles.title]}>Reset password</Text>
                <Text style={[typography.p, styles.subtitle]}>Enter email of registration and we will send you a link to reset your password.</Text>
                
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
                
                <ButtonRounded
                    title='Send'
                    icon={(<MaterialIcons name="trending-flat" size={28} color="white" />)}
                    type='black'
                    onPress={emailForm.handleSubmit(onEmailSubmit)}
                    iconLeft={false}
                    enabled={!isPending && emailForm.formState.isValid}
                />
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
    backgroundImage: {
        flex: 0.33, // h-2/6 equivalent
        width: '100%',
        paddingTop: 80, // pt-20
    },
    content: {
        flex: 1,
        paddingTop: 40, // pt-10
        
        paddingHorizontal: 16, // px-4
    },
    title: {
        width: '100%',
        marginBottom: 24, // mb-6
    },
    inputContainer: {
        marginBottom: 24, // mb-6
    },
    errorText: {
        color: '#EF4444', // text-red-500
        fontSize: 14, // text-sm
        marginTop: 4, // mt-1
        fontFamily: 'Geologica',
    },
    subtitle: {
        marginBottom: 24, // mb-6
    },
});