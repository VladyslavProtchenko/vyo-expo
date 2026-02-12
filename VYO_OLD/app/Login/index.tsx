import React, { useEffect } from 'react';
import { View, Text, ImageBackground,Pressable, StyleSheet } from 'react-native';
import AuthButton from '../_components/authButton';
import ButtonRounded from '../_components/ui/ButtonRounded';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useGoogleSignIn } from '../_hooks/useSupabaseAuth';
import { Props } from '../_types/props';
import { typography, globalStyles } from '../../styles/globalStyles';
import useProfileStore from '../_store/useProfileStore';

export default function Login({ navigation }: Props<'Login'>) {
    const { signInWithGoogle, loading: isGoogleLoading } = useGoogleSignIn();
    const resetStore = useProfileStore((state) => state.resetStore);
    
    // Очищаем стейт при открытии страницы логина
    useEffect(() => {
        resetStore();
    }, []);
    
    const googleLogin = async () => {
        console.log('🔵 Google login button pressed');
        try {
            const result = await signInWithGoogle();
            if (result.success) {
                console.log('✅ Google sign in successful, navigating...');
                navigation.navigate('Privacy');
            } else {
                console.error('❌ Google sign in error:', result.error);
                // TODO: Show error message to user
            }
        } catch (error) {
            console.error('❌ Google login exception:', error);
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../../assets/images/welcome.png')} 
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
                        onPress={() => navigation.navigate('EmailRegistration')}
                        iconLeft={true}
                    />
                    <AuthButton type='google' onPress={googleLogin} enabled={!isGoogleLoading} />
                    <AuthButton type='apple' onPress={googleLogin} enabled={!isGoogleLoading} />
                </View>
                
                <Pressable 
                    style={styles.loginLinkContainer} 
                    onPress={() => navigation.navigate('EmailLogin')}
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
                    <Pressable onPress={() => navigation.navigate('Privacy')}>
                        <Text style={[globalStyles.textLink, styles.termsLink]}> Terms & Conditions </Text>
                    </Pressable>
                    <Text style={[typography.p, styles.termsText]}> and</Text>
                    <Pressable onPress={() => navigation.navigate('Privacy')}>
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
        paddingTop: 80, // pt-20
    },
    scrollView: {
        flex: 1,
        paddingTop: 40, // pt-10
        paddingHorizontal: 16, // px-4
    },
    title: {
        marginBottom: 12, // mb-3
    },
    subtitle: {
        marginBottom: 16, // mb-4
    },
    buttonsContainer: {
        gap: 12, // gap-3
        marginBottom: 24, // mb-6
    },
    loginLinkContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 8, // gap-2
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24, // mb-6
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
