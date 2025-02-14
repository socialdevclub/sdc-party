import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appearance } from '../types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 8,
    padding: 16,
  },
  containerDanger: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
  },
  text: {
    color: '#1f2937',
    fontSize: 14,
    textAlign: 'center',
  },
  textDanger: {
    color: '#dc2626',
  },
});

interface MessageProps {
  children: React.ReactNode;
  color?: 'danger';
  appearance?: Appearance;
}

const Message: React.FC<MessageProps> = ({ children, color, appearance }) => {
  const containerStyle = [styles.container, color === 'danger' && styles.containerDanger, appearance?.style?.message];

  const textStyle = [styles.text, color === 'danger' && styles.textDanger, appearance?.style?.message];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};

export { Message };
