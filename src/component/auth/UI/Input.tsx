import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Appearance } from '../types';

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: 4,
    borderWidth: 1,
    color: '#1f2937',
    fontSize: 14,
    padding: 8,
    width: '100%',
  },
});

interface InputProps extends Omit<TextInputProps, 'style'> {
  type?: 'text' | 'password' | 'email';
  appearance?: Appearance;
}

const Input: React.FC<InputProps> = ({ type = 'text', appearance, ...props }) => {
  const inputProps: TextInputProps = {
    ...props,
    autoCapitalize: type === 'email' ? 'none' : 'sentences',
    keyboardType: type === 'email' ? 'email-address' : 'default',
    secureTextEntry: type === 'password',
  };

  return <TextInput style={[styles.input, appearance?.style?.input]} {...inputProps} />;
};

export { Input };
