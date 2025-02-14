import {
  I18nVariables,
  merge,
  VIEWS,
  en,
  ViewType,
  ViewSignIn,
  ViewSignUp,
  ViewMagicLink,
} from '@supabase/auth-ui-shared';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Auth as AuthProps } from '../types';
import {
  EmailAuth,
  EmailAuthProps,
  ForgottenPassword,
  MagicLink,
  SocialAuth,
  UpdatePassword,
  VerifyOtp,
} from './interfaces';
import { UserContextProvider, useUser } from './UserContext';

interface ContainerProps {
  children: React.ReactNode;
  appearance?: AuthProps['appearance'];
  SignView: boolean;
  supabaseClient: AuthProps['supabaseClient'];
  providers?: AuthProps['providers'];
  providerScopes?: AuthProps['providerScopes'];
  queryParams?: AuthProps['queryParams'];
  socialLayout?: AuthProps['socialLayout'];
  redirectTo?: AuthProps['redirectTo'];
  onlyThirdPartyProviders?: AuthProps['onlyThirdPartyProviders'];
  i18n: I18nVariables;
  authView: ViewType;
}

const Container = ({
  children,
  appearance,
  SignView,
  supabaseClient,
  providers,
  providerScopes,
  queryParams,
  socialLayout,
  redirectTo,
  onlyThirdPartyProviders,
  i18n,
  authView,
}: ContainerProps) => (
  <View style={appearance?.style?.container}>
    {SignView && (
      <SocialAuth
        appearance={appearance}
        supabaseClient={supabaseClient}
        providers={providers}
        providerScopes={providerScopes}
        queryParams={queryParams}
        socialLayout={socialLayout}
        redirectTo={redirectTo}
        onlyThirdPartyProviders={onlyThirdPartyProviders}
        i18n={i18n}
        view={authView as ViewSignIn | ViewSignUp | ViewMagicLink}
      />
    )}
    {!onlyThirdPartyProviders && children}
  </View>
);

function Auth({
  supabaseClient,
  socialLayout = 'vertical',
  providers,
  providerScopes,
  queryParams,
  view = 'sign_in',
  redirectTo,
  onlyThirdPartyProviders = false,
  magicLink = false,
  showLinks = true,
  appearance,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme = 'default',
  localization = { variables: {} },
  otpType = 'email',
  additionalData,
  passwordLimit,
  children,
}: AuthProps): JSX.Element | null {
  /**
   * Localization support
   */

  const i18n: I18nVariables = merge(en, localization.variables ?? {});

  const [authView, setAuthView] = useState(view);
  const [defaultEmail, setDefaultEmail] = useState('');
  const [defaultPassword, setDefaultPassword] = useState('');

  /**
   * Simple boolean to detect if authView 'sign_in' or 'sign_up' or 'magic_link' is used
   *
   * @returns boolean
   */
  const SignView = authView === 'sign_in' || authView === 'sign_up' || authView === 'magic_link';

  useEffect(() => {
    /**
     * Overrides the authview if it is changed externally
     */
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setAuthView('update_password');
      } else if (event === 'USER_UPDATED') {
        setAuthView('sign_in');
      }
    });
    setAuthView(view);

    return () => authListener.subscription.unsubscribe();
  }, [supabaseClient.auth, view]);

  const emailProp: Omit<EmailAuthProps, 'authView' | 'id'> = {
    appearance,
    defaultEmail,
    defaultPassword,
    i18n,
    magicLink,
    passwordLimit,
    redirectTo,
    setAuthView,
    setDefaultEmail,
    setDefaultPassword,
    showLinks,
    supabaseClient,
  };

  const containerProps = {
    SignView,
    appearance,
    authView,
    i18n,
    onlyThirdPartyProviders,
    providerScopes,
    providers,
    queryParams,
    redirectTo,
    socialLayout,
    supabaseClient,
  };

  /**
   * View handler, displays the correct Auth view
   * all views are wrapped in <Container/>
   */
  switch (authView) {
    case VIEWS.SIGN_IN:
      return (
        <Container {...containerProps}>
          <EmailAuth {...emailProp} authView="sign_in" />
        </Container>
      );
    case VIEWS.SIGN_UP:
      return (
        <Container {...containerProps}>
          <EmailAuth
            appearance={appearance}
            supabaseClient={supabaseClient}
            authView="sign_up"
            setAuthView={setAuthView}
            defaultEmail={defaultEmail}
            defaultPassword={defaultPassword}
            setDefaultEmail={setDefaultEmail}
            setDefaultPassword={setDefaultPassword}
            redirectTo={redirectTo}
            magicLink={magicLink}
            showLinks={showLinks}
            i18n={i18n}
            additionalData={additionalData}
            passwordLimit={passwordLimit}
          >
            {children}
          </EmailAuth>
        </Container>
      );
    case VIEWS.FORGOTTEN_PASSWORD:
      return (
        <Container {...containerProps}>
          <ForgottenPassword
            appearance={appearance}
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
            showLinks={showLinks}
            i18n={i18n}
          />
        </Container>
      );

    case VIEWS.MAGIC_LINK:
      return (
        <Container {...containerProps}>
          <MagicLink
            appearance={appearance}
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
            showLinks={showLinks}
            i18n={i18n}
          />
        </Container>
      );

    case VIEWS.UPDATE_PASSWORD:
      return (
        <UpdatePassword
          appearance={appearance}
          supabaseClient={supabaseClient}
          i18n={i18n}
          passwordLimit={passwordLimit}
        />
      );
    case VIEWS.VERIFY_OTP:
      return <VerifyOtp appearance={appearance} supabaseClient={supabaseClient} otpType={otpType} i18n={i18n} />;
    default:
      return null;
  }
}

Auth.ForgottenPassword = ForgottenPassword;
Auth.UpdatePassword = UpdatePassword;
Auth.MagicLink = MagicLink;
Auth.UserContextProvider = UserContextProvider;
Auth.useUser = useUser;

export default Auth;
