import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

/**
 * TaskMind AppLogo — pure React Native, no SVG dependency.
 * Indigo rounded square with 'T' monogram + sparkle dot.
 */
export const AppLogo = ({ size = 32 }) => {
  const radius = size * 0.22;
  const fontSize = size * 0.48;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: radius,
        },
      ]}
    >
      {/* Gold sparkle dot top-right */}
      <View
        style={[
          styles.sparkleDot,
          {
            width: size * 0.22,
            height: size * 0.22,
            borderRadius: size * 0.11,
            top: size * 0.06,
            right: size * 0.06,
          },
        ]}
      />
      <Text style={[styles.monogram, { fontSize, lineHeight: size }]}>T</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sparkleDot: {
    position: 'absolute',
    backgroundColor: '#FACC15',
  },
  monogram: {
    color: '#FFFFFF',
    fontWeight: '800',
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default AppLogo;
