import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import { globalStyles, typography } from '@/constants/typography';
import Toast from 'react-native-toast-message';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CONSENT_VERSION = '2026-03-06';

export default function Privacy() {
  const router = useRouter();
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    if (!termsChecked || !privacyChecked) return;

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const consentTimestamp = new Date().toISOString();
        await supabase
          .from('profiles')
          .update({
            terms_accepted_at: consentTimestamp,
            privacy_accepted_at: consentTimestamp,
            consent_version: CONSENT_VERSION,
          })
          .eq('id', session.user.id);
      }
      router.replace('/onboarding/step-1' as any);
    } catch (err: unknown) {
      Sentry.captureException(err, { tags: { action: 'accept_privacy' } });
      Toast.show({ type: 'error', text1: 'Failed to save consent', text2: 'Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const canProceed = termsChecked && privacyChecked && !loading;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/flower.png')}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[typography.h1, styles.title]}>We respect your privacy</Text>
          <Text style={[typography.p, styles.text]}>
            VYO collects your account data, optional health and menstrual information, and usage preferences to personalise your experience. Your data is stored securely on EU servers and is never sold to third parties.
          </Text>
          <Text style={[typography.p, styles.text]}>
            Please review and accept the documents below to continue.
          </Text>

          <TouchableOpacity
            style={styles.consentRow}
            onPress={() => setTermsChecked(prev => !prev)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, termsChecked && styles.checkboxChecked]}>
              {termsChecked && <MaterialIcons name="check" size={14} color="white" />}
            </View>
            <View style={styles.consentTextContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Text style={[typography.p, styles.consentText]}>I agree to VYO </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={[globalStyles.textLink, styles.consentText, styles.link]}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.consentRow}
            onPress={() => setPrivacyChecked(prev => !prev)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, privacyChecked && styles.checkboxChecked]}>
              {privacyChecked && <MaterialIcons name="check" size={14} color="white" />}
            </View>
            <View style={styles.consentTextContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Text style={[typography.p, styles.consentText]}>I consent to the collection and processing of my personal and health data as described in the </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={[globalStyles.textLink, styles.consentText, styles.link]}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, !canProceed && styles.buttonDisabled]}
            onPress={handleAccept}
            disabled={!canProceed}
            activeOpacity={0.8}
          >
            {loading
              ? <ActivityIndicator color="white" />
              : <Text style={styles.buttonText}>I Accept</Text>
            }
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingTop: 160,
    paddingHorizontal: 16,
    paddingBottom: 48,
  },
  title: {
    color: 'white',
    marginBottom: 16,
  },
  text: {
    color: 'white',
    marginBottom: 12,
    opacity: 0.9,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  consentTextContainer: {
    flex: 1,
  },
  consentText: {
    color: 'white',
    fontSize: 14,
  },
  link: {
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  button: {
    marginTop: 32,
    backgroundColor: '#000',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
});
