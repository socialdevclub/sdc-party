import { SupabaseClient } from '@supabase/supabase-js';
import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { I18nVariables, RedirectTo, ViewSignUp, ViewSignIn, VIEWS, ViewType } from '@supabase/auth-ui-shared';
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

export interface EmailAuthProps {
  authView?: ViewSignIn | ViewSignUp;
  defaultEmail?: string;
  defaultPassword?: string;
  setAuthView: (view: ViewType) => void;
  setDefaultEmail?: (email: string) => void;
  setDefaultPassword?: (password: string) => void;
  supabaseClient: SupabaseClient;
  showLinks?: boolean;
  redirectTo?: RedirectTo;
  additionalData?: { [key: string]: unknown };
  magicLink?: boolean;
  i18n?: I18nVariables;
  appearance?: Appearance;
  passwordLimit?: boolean;
  children?: React.ReactNode;
}

function EmailAuth({
  authView = 'sign_in',
  defaultEmail = '',
  defaultPassword = '',
  setAuthView = () => {},
  setDefaultEmail = (_email) => {},
  setDefaultPassword = (_password) => {},
  supabaseClient,
  showLinks = false,
  redirectTo,
  additionalData,
  magicLink,
  i18n,
  appearance,
  passwordLimit = false,
  children,
}: EmailAuthProps) {
  const isMounted = useRef<boolean>(true);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    isMounted.current = true;
    setEmail(defaultEmail);
    setPassword(defaultPassword);

    return () => {
      isMounted.current = false;
    };
  }, [authView, defaultEmail, defaultPassword]);

  const handleSignIn = async () => {
    const { error: signInError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {setError(signInError.message);}
  };

  const handleSignUp = async () => {
    if (passwordLimit && password.length > 72) {
      setError('Password exceeds maxmium length of 72 characters');
      return;
    }
    const options: { emailRedirectTo: RedirectTo; data?: object } = {
      emailRedirectTo: redirectTo,
    };
    if (additionalData) {
      options.data = additionalData;
    }
    const {
      data: { user: signUpUser, session: signUpSession },
      error: signUpError,
    } = await supabaseClient.auth.signUp({
      email,
      options,
      password,
    });
    if (signUpError) {setError(signUpError.message);}
    else if (signUpUser && !signUpSession) {setMessage(i18n?.sign_up?.confirmation_text as string);}
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    switch (authView) {
      case 'sign_in':
        await handleSignIn();
        break;
      case 'sign_up':
        await handleSignUp();
        break;
      default:
    }

    if (isMounted.current) {setLoading(false);}
  };

  const handleViewChange = (newView: ViewType) => {
    setDefaultEmail(email);
    setDefaultPassword(password);
    setAuthView(newView);
  };

  const labels = i18n?.[authView];

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
        />
      </View>
      <View style={{ marginTop: 16 }}>
        <Text style={[styles.label, appearance?.style?.label]}>{labels?.password_label}</Text>
        <TextInput
          style={[styles.input, appearance?.style?.input]}
          placeholder={labels?.password_input_placeholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      {children}

      <TouchableOpacity style={[styles.button, appearance?.style?.button]} onPress={handleSubmit} disabled={loading}>
        <Text style={[styles.buttonText, appearance?.style?.button]}>
          {loading ? labels?.loading_button_label : labels?.button_label}
        </Text>
      </TouchableOpacity>

      {showLinks && (
        <View>
          {authView === VIEWS.SIGN_IN && magicLink && (
            <TouchableOpacity onPress={() => setAuthView(VIEWS.MAGIC_LINK)}>
              <Text style={[styles.link, appearance?.style?.anchor]}>{i18n?.magic_link?.link_text}</Text>
            </TouchableOpacity>
          )}
          {authView === VIEWS.SIGN_IN && (
            <TouchableOpacity onPress={() => setAuthView(VIEWS.FORGOTTEN_PASSWORD)}>
              <Text style={[styles.link, appearance?.style?.anchor]}>{i18n?.forgotten_password?.link_text}</Text>
            </TouchableOpacity>
          )}
          {authView === VIEWS.SIGN_IN ? (
            <TouchableOpacity onPress={() => handleViewChange(VIEWS.SIGN_UP)}>
              <Text style={[styles.link, appearance?.style?.anchor]}>{i18n?.sign_up?.link_text}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleViewChange(VIEWS.SIGN_IN)}>
              <Text style={[styles.link, appearance?.style?.anchor]}>{i18n?.sign_in?.link_text}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {message && <Text style={[styles.message, appearance?.style?.message]}>{message}</Text>}
      {error && <Text style={[styles.error, appearance?.style?.message]}>{error}</Text>}
    </View>
  );
}

export { EmailAuth };
