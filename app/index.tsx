import AuthButton from '@/components/AuthButton';
import ButtonRounded from '@/components/ui/ButtonRounded';
import { globalStyles, typography } from '@/constants/typography';
import { useGoogleSignIn } from '@/hooks/useGoogleSignIn';
import useProfileStore from '@/store/useProfileStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Login() {
    const router = useRouter();
    const { signInWithGoogle, loading: isGoogleLoading } = useGoogleSignIn();
    const resetStore = useProfileStore((state) => state.resetStore);
    
    useEffect(() => {
        resetStore();
        // Redirect to complete-profile (step 1) on app load
        router.replace('/complete-profile' as any);
    }, []);

    const googleLogin = async () => {
        console.log('🔵 Google login button pressed');
        try {
            const result = await signInWithGoogle();
            if (result.success) {
                console.log('✅ Google sign in successful, navigating...');
                router.push('/privacy' as any);
            } else {
                console.error('❌ Google sign in error:', result.error);
            }
        } catch (error) {
            console.error('❌ Google login exception:', error);
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('@/assets/images/welcome.png')} 
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
