import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Appearance } from '../types';

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vertical: {
    flexDirection: 'column',
  },
});

const getGapStyle = (gap?: 'small' | 'medium' | 'large'): ViewStyle => {
  switch (gap) {
    case 'large':
      return { gap: 16 };
    case 'medium':
      return { gap: 8 };
    case 'small':
    default:
      return { gap: 4 };
  }
};

export interface ContainerProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  gap?: 'small' | 'medium' | 'large';
  appearance?: Appearance;
}

const Container: React.FC<ContainerProps> = ({ children, direction = 'vertical', gap = 'small', appearance }) => {
  const containerStyle = [
    styles.container,
    direction === 'horizontal' ? styles.horizontal : styles.vertical,
    getGapStyle(gap),
    appearance?.style?.container,
  ];

  return <View style={containerStyle}>{children}</View>;
};

export { Container };
