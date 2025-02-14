import { Provider, SupabaseClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
  I18nVariables,
  ProviderScopes,
  SocialLayout,
  template,
  ViewSignIn,
  ViewSignUp,
  ViewMagicLink,
} from '@supabase/auth-ui-shared';
import { Appearance } from '../../types';
import { Icons } from '../Icons.js';
import React from 'react';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    padding: 12,
  },
  buttonText: {
    color: '#1f2937',
    fontSize: 14,
    marginLeft: 8,
  },
  container: {
    width: '100%',
  },
  divider: {
    backgroundColor: '#e5e7eb',
    height: 1,
    marginVertical: 16,
  },
  horizontalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

interface SocialAuthProps {
  supabaseClient: SupabaseClient;
  socialLayout?: SocialLayout;
  providers?: Provider[];
  providerScopes?: Partial<ProviderScopes>;
  queryParams?: { [key: string]: string };
  redirectTo?: RedirectTo;
  onlyThirdPartyProviders?: boolean;
  view?: ViewSignIn | ViewSignUp | ViewMagicLink;
  i18n?: I18nVariables;
  appearance?: Appearance;
}

type RedirectTo = undefined | string;

function SocialAuth({
  supabaseClient,
  socialLayout = 'vertical',
  providers = ['github', 'google', 'azure'],
  providerScopes,
  queryParams,
  redirectTo,
  onlyThirdPartyProviders = true,
  view = 'sign_in',
  i18n,
  appearance,
}: SocialAuthProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const verticalSocialLayout = socialLayout === 'vertical';

  const currentView = view === 'magic_link' ? 'sign_in' : view;

  const handleProviderSignIn = async (provider: Provider) => {
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithOAuth({
      options: {
        queryParams,
        redirectTo,
        scopes: providerScopes?.[provider],
      },
      provider,
    });
    if (error) {setError(error.message);}
    setLoading(false);
  };

  function handleProviderNameEdgeCases(provider: string) {
    if (provider === 'linkedin_oidc') {
      return 'LinkedIn';
    }
    return provider;
  }

  function capitalize(word: string) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <>
      {providers && providers.length > 0 && (
        <>
          <View style={[styles.container, appearance?.style?.container]}>
            <View style={verticalSocialLayout ? undefined : styles.horizontalContainer}>
              {providers.map((provider: Provider) => {
                return (
                  <TouchableOpacity
                    key={provider}
                    style={[
                      styles.button,
                      appearance?.style?.button,
                      !verticalSocialLayout && { flex: 1, marginHorizontal: 4 },
                    ]}
                    onPress={() => handleProviderSignIn(provider)}
                    disabled={loading}
                  >
                    <Icons provider={provider} />
                    {verticalSocialLayout && (
                      <Text style={[styles.buttonText, appearance?.style?.button]}>
                        {template(i18n?.[currentView]?.social_provider_text as string, {
                          provider: capitalize(handleProviderNameEdgeCases(provider)),
                        })}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          {!onlyThirdPartyProviders && <View style={styles.divider} />}
        </>
      )}
      {error && <Text style={[{ color: '#dc2626', marginTop: 8 }, appearance?.style?.message]}>{error}</Text>}
    </>
  );
}

export { SocialAuth };
