import { BaseAppearance, BaseAuth } from '@supabase/auth-ui-shared';
import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface Appearance extends BaseAppearance {
  style?: {
    anchor?: StyleProp<TextStyle>;
    button?: StyleProp<ViewStyle>;
    container?: StyleProp<ViewStyle>;
    divider?: StyleProp<ViewStyle>;
    input?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
    loader?: StyleProp<ViewStyle>;
    message?: StyleProp<TextStyle>;
  };
}

export interface Auth extends BaseAuth {
  children?: ReactNode;
  appearance?: Appearance;
  passwordLimit?: boolean;
}
