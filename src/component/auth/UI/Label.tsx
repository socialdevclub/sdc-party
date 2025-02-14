import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Appearance } from '../types';

const styles = StyleSheet.create({
  label: {
    color: '#1f2937',
    fontSize: 14,
    marginBottom: 4,
  },
});

interface LabelProps {
  children: React.ReactNode;
  appearance?: Appearance;
}

const Label: React.FC<LabelProps> = ({ children, appearance }) => {
  return <Text style={[styles.label, appearance?.style?.label]}>{children}</Text>;
};

export { Label };
