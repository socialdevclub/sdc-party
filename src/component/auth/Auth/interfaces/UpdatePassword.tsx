import { SupabaseClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { I18nVariables } from '@supabase/auth-ui-shared';
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
  message: {
    color: '#059669',
    marginTop: 8,
  },
});

function UpdatePassword({
  supabaseClient,
  i18n,
  appearance,
  passwordLimit = false,
}: {
  supabaseClient: SupabaseClient;
  i18n?: I18nVariables;
  appearance?: Appearance;
  passwordLimit?: boolean;
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    if (passwordLimit && password.length > 72) {
      setError('Password exceeds maxmium length of 72 characters');
      setLoading(false);
      return;
    }
    const { error } = await supabaseClient.auth.updateUser({ password });
    if (error) {setError(error.message);}
    else {setMessage(i18n?.update_password?.confirmation_text as string);}
    setLoading(false);
  };

  const labels = i18n?.update_password;

  return (
    <View style={[styles.container, appearance?.style?.container]}>
      <View>
        <Text style={[styles.label, appearance?.style?.label]}>{labels?.password_label}</Text>
        <TextInput
          style={[styles.input, appearance?.style?.input]}
          placeholder={labels?.password_input_placeholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
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
      {message && <Text style={[styles.message, appearance?.style?.message]}>{message}</Text>}
      {error && <Text style={[styles.error, appearance?.style?.message]}>{error}</Text>}
    </View>
  );
}

export { UpdatePassword };
