import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Appearance } from '../types';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonPrimary: {
    backgroundColor: '#2563eb',
    borderColor: '#1d4ed8',
  },
  buttonText: {
    color: '#1f2937',
    fontSize: 14,
  },
  buttonTextPrimary: {
    color: '#ffffff',
  },
  iconContainer: {
    marginRight: 8,
  },
});

interface ButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  color?: 'default' | 'primary';
  loading?: boolean;
  appearance?: Appearance;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, color = 'default', appearance, icon, loading = false, onPress }) => {
  const buttonStyle = [
    styles.button,
    color === 'primary' && styles.buttonPrimary,
    loading && styles.buttonDisabled,
    appearance?.style?.button,
  ];

  const textStyle = [styles.buttonText, color === 'primary' && styles.buttonTextPrimary, appearance?.style?.button];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={loading}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

export { Button };
