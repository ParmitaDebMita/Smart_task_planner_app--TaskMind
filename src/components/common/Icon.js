import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export const Icon = ({
  name,
  size = 22,
  color = colors.onSurface,
  fill = false,
  style,
}) => {
  return (
    <Text
      style={[
        styles.icon,
        {
          fontSize: size,
          color,
          fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0",
        },
        style,
      ]}
    >
      {name}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'Material Symbols Outlined, Material Icons, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    userSelect: 'none',
  },
});

export default Icon;
