import { SupabaseClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { VIEWS, I18nVariables, RedirectTo } from '@supabase/auth-ui-shared';
import { Appearance } from '../../types';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 4,
    marginTop: 16,
    padding: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  container: {
    width: '100%',
  },
  error: {
    color: '#dc2626',
    marginTop: 8,
  },
  input: {
    borderColor: '#e5e7eb',
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 4,
    padding: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  link: {
    color: '#2563eb',
    marginTop: 8,
  },
  message: {
    color: '#059669',
    marginTop: 8,
  },
});

function ForgottenPassword({
  setAuthView = () => {},
  supabaseClient,
  redirectTo,
  i18n,
  appearance,
  showLinks = false,
}: {
  setAuthView: (view: (typeof VIEWS)[keyof typeof VIEWS]) => void;
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

  const handlePasswordReset = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) {setError(error.message);}
    else {setMessage(i18n?.forgotten_password?.confirmation_text as string);}
    setLoading(false);
  };

  const labels = i18n?.forgotten_password;

  return (
    <View style={[styles.container, appearance?.style?.container]}>
      <View>
        <Text style={[styles.label, appearance?.style?.label]}>{labels?.email_label}</Text>
        <TextInput
          style={[styles.input, appearance?.style?.input]}
          placeholder={labels?.email_input_placeholder}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoFocus
        />
      </View>
      <TouchableOpacity
        style={[styles.button, appearance?.style?.button]}
        onPress={handlePasswordReset}
        disabled={loading}
      >
        <Text style={[styles.buttonText, appearance?.style?.button]}>
          {loading ? labels?.loading_button_label : labels?.button_label}
        </Text>
      </TouchableOpacity>
      {showLinks && (
        <TouchableOpacity onPress={() => setAuthView(VIEWS.SIGN_IN)}>
          <Text style={[styles.link, appearance?.style?.anchor]}>{i18n?.sign_in?.link_text}</Text>
        </TouchableOpacity>
      )}
      {message && <Text style={[styles.message, appearance?.style?.message]}>{message}</Text>}
      {error && <Text style={[styles.error, appearance?.style?.message]}>{error}</Text>}
    </View>
  );
}

export { ForgottenPassword };
