import { SupabaseClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { VIEWS, I18nVariables, RedirectTo } from '@supabase/auth-ui-shared';
import { Appearance } from '../../types';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
    padding: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  container: {
    gap: 20,
    padding: 16,
  },
  errorMessage: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
  },
  input: {
    borderColor: '#E2E8F0',
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 8,
    padding: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  link: {
    color: '#3B82F6',
    marginTop: 12,
    textAlign: 'center',
  },
  message: {
    borderRadius: 4,
    marginTop: 12,
    padding: 8,
  },
  successMessage: {
    backgroundColor: '#DCFCE7',
    color: '#16A34A',
  },
});

function MagicLink({
  setAuthView = () => {},
  supabaseClient,
  redirectTo,
  i18n,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  appearance,
  showLinks = false,
}: {
  setAuthView?: (view: (typeof VIEWS)[keyof typeof VIEWS]) => void;
  supabaseClient: SupabaseClient;
  redirectTo?: RedirectTo;
  i18n?: I18nVariables;
  appearance?: Appearance;
  showLinks?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMagicLinkSignIn = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    if (email.length === 0) {
      setError(i18n?.magic_link?.empty_email_address as string);
      setLoading(false);
      return;
    }
    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) {setError(error.message);}
    else {setMessage(i18n?.magic_link?.confirmation_text as string);}
    setLoading(false);
  };

  const labels = i18n?.magic_link;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{labels?.email_input_label}</Text>
        <TextInput
          style={styles.input}
          placeholder={labels?.email_input_placeholder}
          onChangeText={(text) => {
            setError('');
            setEmail(text);
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleMagicLinkSignIn}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? labels?.loading_button_label : labels?.button_label}</Text>
      </TouchableOpacity>
      {showLinks && (
        <TouchableOpacity onPress={() => setAuthView(VIEWS.SIGN_IN)}>
          <Text style={styles.link}>{i18n?.sign_in?.link_text}</Text>
        </TouchableOpacity>
      )}
      {message && (
        <View style={[styles.message, styles.successMessage]}>
          <Text>{message}</Text>
        </View>
      )}
      {error && (
        <View style={[styles.message, styles.errorMessage]}>
          <Text>{error}</Text>
        </View>
      )}
    </View>
  );
}

export { MagicLink };
