import { EmailOtpType, MobileOtpType, SupabaseClient, VerifyOtpParams } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { VIEWS, I18nVariables, OtpType } from '@supabase/auth-ui-shared';
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
    textAlign: 'center',
  },
  message: {
    color: '#059669',
    marginTop: 8,
  },
});

function VerifyOtp({
  setAuthView = () => {},
  supabaseClient,
  otpType = 'email',
  i18n,
  appearance,
  showLinks = false,
}: {
  setAuthView?: (view: (typeof VIEWS)[keyof typeof VIEWS]) => void;
  supabaseClient: SupabaseClient;
  otpType: OtpType;
  i18n?: I18nVariables;
  appearance?: Appearance;
  showLinks?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    let verifyOpts: VerifyOtpParams = {
      email,
      token,
      type: otpType as EmailOtpType,
    };
    if (['sms', 'phone_change'].includes(otpType)) {
      verifyOpts = {
        phone,
        token,
        type: otpType as MobileOtpType,
      };
    }
    const { error } = await supabaseClient.auth.verifyOtp(verifyOpts);
    if (error) {setError(error.message);}
    setLoading(false);
  };

  const labels = i18n?.verify_otp;

  return (
    <View style={[styles.container, appearance?.style?.container]}>
      {['sms', 'phone_change'].includes(otpType) ? (
        <View>
          <Text style={[styles.label, appearance?.style?.label]}>{labels?.phone_input_label}</Text>
          <TextInput
            style={[styles.input, appearance?.style?.input]}
            placeholder={labels?.phone_input_placeholder}
            value={phone}
            onChangeText={setPhone}
            autoFocus
            keyboardType="phone-pad"
          />
        </View>
      ) : (
        <View>
          <Text style={[styles.label, appearance?.style?.label]}>{labels?.email_input_label}</Text>
          <TextInput
            style={[styles.input, appearance?.style?.input]}
            placeholder={labels?.email_input_placeholder}
            value={email}
            onChangeText={setEmail}
            autoFocus
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      )}
      <View style={{ marginTop: 16 }}>
        <Text style={[styles.label, appearance?.style?.label]}>{labels?.token_input_label}</Text>
        <TextInput
          style={[styles.input, appearance?.style?.input]}
          placeholder={labels?.token_input_placeholder}
          value={token}
          onChangeText={setToken}
        />
      </View>
      <TouchableOpacity style={[styles.button, appearance?.style?.button]} onPress={handleSubmit} disabled={loading}>
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

export { VerifyOtp };
