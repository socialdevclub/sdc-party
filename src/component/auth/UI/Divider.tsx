import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appearance } from '../types';

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#e5e7eb',
    height: 1,
    marginVertical: 16,
    width: '100%',
  },
});

interface DividerProps {
  appearance?: Appearance;
}

const Divider: React.FC<DividerProps> = ({ appearance }) => {
  return <View style={[styles.divider, appearance?.style?.divider]} />;
};

export { Divider };
