// GENERAL
import Auth from './Auth/Auth';
import { Appearance, Auth as AuthProps } from './types';
import { UserContextProvider, useUser } from './Auth/UserContext';
import type { AuthSession } from './Auth/UserContext';
import {
  EmailAuth,
  ForgottenPassword,
  MagicLink,
  SocialAuth,
  UpdatePassword,
  VerifyOtp,
} from './Auth/interfaces';

export {
  Auth,
  UserContextProvider,
  useUser,
  EmailAuth,
  ForgottenPassword,
  MagicLink,
  SocialAuth,
  UpdatePassword,
  VerifyOtp,
};
export type { Appearance, AuthProps, AuthSession };
export default Auth;
