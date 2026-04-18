import AuthButton from '@/components/AuthButton';
import ButtonRounded from '@/components/ui/ButtonRounded';
import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import { globalStyles, typography } from '@/constants/typography';
import { useGoogleSignIn } from '@/hooks/useGoogleSignIn';
import { useLoadUserData } from '@/hooks/useLoadUserData';
import Toast from 'react-native-toast-message';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Login() {
    const router = useRouter();
    
    const { signInWithGoogle, loading: isGoogleLoading } = useGoogleSignIn();
    const [checking, setChecking] = useState(true);
    const { refetch: loadUserData } = useLoadUserData();
    
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                console.log('👤 No active session - showing login screen');
                setChecking(false);
                return;
            }

            console.log('✅ User is authenticated:', session.user.email);
            
            console.log('📥 Loading user data...');
            await loadUserData();
            
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('onboarding_completed, privacy_accepted_at')
                .eq('id', session.user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                Sentry.captureException(error, { tags: { action: 'check_profile' } });
                Toast.show({ type: 'error', text1: 'Failed to load profile', text2: error.message });
                setChecking(false);
                return;
            }

            if (!profile) {
                console.log('📝 Profile not found - creating profile...');
                const fullName = session.user.user_metadata?.full_name ||
                               session.user.user_metadata?.name ||
                               session.user.email?.split('@')[0] || '';
                const firstName = fullName.split(' ')[0];

                const { error: createError } = await supabase
                    .from('profiles')
                    .insert({
                        id: session.user.id,
                        email: session.user.email || '',
                        name: firstName,
                    });

                if (createError) {
                    Sentry.captureException(createError, { tags: { action: 'create_profile' } });
                    Toast.show({ type: 'error', text1: 'Failed to create profile', text2: createError.message });
                    setChecking(false);
                    return;
                }

                console.log('✅ Profile created - redirecting to consent screen');
                router.replace('/privacy' as any);
                return;
            }

            if (!profile.privacy_accepted_at) {
                console.log('📋 Consent not given - redirecting to privacy screen');
                router.replace('/privacy' as any);
                return;
            }

            if (profile?.onboarding_completed) {
                console.log('🏠 Onboarding completed - redirecting to home');
                router.replace('/(tabs)/home' as any);
            } else {
                console.log('📝 Onboarding not completed - redirecting to onboarding');
                router.replace('/onboarding/step-1' as any);
            }
        } catch (error: unknown) {
            Sentry.captureException(error, { tags: { action: 'check_auth_status' } });
            setChecking(false);
        }
    };

    const googleLogin = async () => {
        console.log('🔵 Google login button pressed');
        try {
            const result = await signInWithGoogle();
            if (result.success) {
                console.log('✅ Google sign in successful, checking onboarding...');
                await checkAuthStatus();
            } else {
                console.error('❌ Google sign in error:', result.error);
            }
        } catch (error: unknown) {
            Sentry.captureException(error, { tags: { action: 'google_login' } });
        }
    }

    // Show loading while checking auth status
    if (checking) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#000000" />
                <Text style={[typography.p, { marginTop: 16 }]}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('@/assets/images/welcome.webp')} 
                resizeMode="cover" 
                style={styles.backgroundImage}
            />
            <View style={styles.scrollView}>
                <Text style={[typography.h1, styles.title]}>Reinvent your health</Text>
                <Text style={[typography.p, styles.subtitle]}>
                    Track cycle, get tips, and let's create your personalized care plan 💛
                </Text>
                <View style={styles.buttonsContainer}>
                    <ButtonRounded
                        title='Continue with Email'
                        icon={(<MaterialIcons name="email" size={24} color="white" />)}
                        type='black'
                        onPress={() => router.push('/email-registration' as any)}
                        iconLeft={true}
                    />
                    <AuthButton type='google' onPress={googleLogin} enabled={!isGoogleLoading} />
                    <AuthButton type='apple' onPress={googleLogin} enabled={!isGoogleLoading} />
                </View>
                
                <Pressable 
                    style={styles.loginLinkContainer} 
                    onPress={() => router.push('/email-login' as any)}
                >
                    <Text style={[typography.p, styles.loginText]}>
                        Have an account? 
                    </Text>
                    <Text style={[typography.p, globalStyles.textLink, styles.loginLink]}>
                        Log in
                    </Text>
                </Pressable>
                
                <Text style={[typography.p, styles.termsText]}>
                    By continuing, you agree for VYO
                </Text>
                <View style={styles.termsContainer}>
                    <Pressable onPress={() => router.push('/privacy' as any)}>
                        <Text style={[globalStyles.textLink, styles.termsLink]}> Terms & Conditions </Text>
                    </Pressable>
                    <Text style={[typography.p, styles.termsText]}> and</Text>
                    <Pressable onPress={() => router.push('/privacy' as any)}>
                        <Text style={[globalStyles.textLink, styles.termsLink]}> Privacy Policy. </Text>
                    </Pressable>
                </View>
                
                <Text style={[typography.p, styles.termsText]}>
                    Ps, we'll never share your personal data
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 0.33,
        width: '100%',
        alignItems: 'center',
        paddingTop: 80,
    },
    scrollView: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    title: {
        marginBottom: 12,
    },
    subtitle: {
        marginBottom: 16,
    },
    buttonsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    loginLinkContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    loginText: {
        opacity: 0.6,
    },
    loginLink: {
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
    termsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    termsText: {
        fontSize: 14,
        opacity: 0.6,
    },
    termsLink: {
        fontSize: 14,
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
});
