import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Appearance } from '../types';

const styles = StyleSheet.create({
  anchor: {
    marginBottom: 8,
  },
  text: {
    color: '#2563eb',
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

interface AnchorProps {
  children: React.ReactNode;
  appearance?: Appearance;
  onPress?: () => void;
}

const Anchor: React.FC<AnchorProps> = ({ children, appearance, onPress }) => {
  return (
    <TouchableOpacity style={[styles.anchor, appearance?.style?.anchor]} onPress={onPress}>
      <Text style={[styles.text, appearance?.style?.anchor]}>{children}</Text>
    </TouchableOpacity>
  );
};

export { Anchor };
