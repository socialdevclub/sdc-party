import React from 'react';
import { View, StyleSheet, Animated, ViewProps } from 'react-native';
import { Appearance } from '../types';

export interface LoaderProps extends ViewProps {
  appearance?: Appearance;
}

function Loader({ appearance, style, ...props }: LoaderProps) {
  const spinValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1100,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.loader,
          appearance?.style?.loader,
          { transform: [{ rotate: spin }] },
        ]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderTopColor: '#ffffff',
  },
});

export { Loader };
