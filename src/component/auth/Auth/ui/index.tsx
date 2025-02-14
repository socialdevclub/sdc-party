import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { Auth as AuthProps } from '../../types';
import Auth from '../Auth';

const containerDefaultStyles: ViewStyle = {
  borderRadius: 12,
  padding: 28,
  shadowColor: 'rgba(100, 100, 111, 0.2)',
  shadowOffset: { height: 7, width: 0 },
  shadowOpacity: 1,
  shadowRadius: 29,
  width: 360,
};

interface Card {
  style?: ViewStyle;
}

export const AuthCard = ({ children, appearance }: { children?: ReactNode; appearance?: Card }) => {
  return <View style={[containerDefaultStyles, appearance?.style]}>{children}</View>;
};

export const SignUp = (props: Omit<AuthProps, 'view' | 'onlyThirdPartyProviders'>) => {
  return <Auth showLinks={false} {...props} onlyThirdPartyProviders={false} view="sign_up" />;
};

export const SignIn = (props: Omit<AuthProps, 'view' | 'onlyThirdPartyProviders' | 'additionalData'>) => {
  return <Auth showLinks={false} {...props} onlyThirdPartyProviders={false} view="sign_in" />;
};

export const MagicLink = (
  props: Omit<AuthProps, 'view' | 'onlyThirdPartyProviders' | 'magicLink' | 'showLinks' | 'additionalData'>,
) => {
  return <Auth {...props} view="magic_link" showLinks={false} />;
};

export const SocialAuth = (
  props: Omit<AuthProps, 'view' | 'onlyThirdPartyProviders' | 'magicLink' | 'showLinks' | 'additionalData'>,
) => {
  return <Auth {...props} view="sign_in" showLinks={false} onlyThirdPartyProviders />;
};

export const ForgottenPassword = (
  props: Pick<AuthProps, 'supabaseClient' | 'appearance' | 'localization' | 'theme' | 'showLinks' | 'redirectTo'>,
) => {
  return <Auth showLinks={false} {...props} view="forgotten_password" />;
};

export const UpdatePassword = (props: Pick<AuthProps, 'supabaseClient' | 'appearance' | 'localization' | 'theme'>) => {
  return <Auth {...props} view="update_password" />;
};

export const VerifyOtp = (
  props: Pick<AuthProps, 'supabaseClient' | 'appearance' | 'localization' | 'theme' | 'otpType'>,
) => {
  return <Auth {...props} view="verify_otp" />;
};
