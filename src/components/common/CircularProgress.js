import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

/**
 * CircularProgress — pure React Native implementation using View transforms.
 * Replaces react-native-svg to ensure cross-platform web compatibility.
 */
export const CircularProgress = ({
  size = 64,
  strokeWidth = 6,
  progress = 60,
  color = colors.primaryContainer,
  trackColor = colors.surfaceContainerHighest,
  label,
  sublabel,
  children,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  // We simulate a circular progress using layered Views with overflow:hidden
  // The inner container clips half-rotated fill views
  const halfSize = size / 2;
  const innerSize = size - strokeWidth * 2;

  // Convert progress to degrees
  const degrees = (clampedProgress / 100) * 360;

  // Build arc using two halves
  const leftDeg = degrees > 180 ? 180 : degrees;
  const rightDeg = degrees > 180 ? degrees - 180 : 0;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Track ring */}
      <View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: halfSize,
            borderWidth: strokeWidth,
            borderColor: trackColor,
          },
        ]}
      />

      {/* Progress overlay using two semi-circle clips */}
      {/* Right half fill */}
      {rightDeg > 0 && (
        <View
          style={[
            styles.halfClip,
            {
              width: halfSize,
              height: size,
              left: halfSize,
              top: 0,
              overflow: 'hidden',
              position: 'absolute',
            },
          ]}
        >
          <View
            style={{
              width: size,
              height: size,
              borderRadius: halfSize,
              borderWidth: strokeWidth,
              borderColor: color,
              position: 'absolute',
              left: -halfSize,
              top: 0,
              transform: [{ rotate: `${rightDeg}deg` }],
              borderLeftColor: 'transparent',
              borderBottomColor: 'transparent',
            }}
          />
        </View>
      )}

      {/* Left half fill */}
      {leftDeg > 0 && (
        <View
          style={{
            width: halfSize,
            height: size,
            left: 0,
            top: 0,
            overflow: 'hidden',
            position: 'absolute',
          }}
        >
          <View
            style={{
              width: size,
              height: size,
              borderRadius: halfSize,
              borderWidth: strokeWidth,
              borderColor: leftDeg >= 180 ? color : 'transparent',
              borderRightColor: color,
              position: 'absolute',
              left: 0,
              top: 0,
              transform: [{ rotate: `${leftDeg - 90}deg` }],
            }}
          />
        </View>
      )}

      {/* White inner circle to create ring effect */}
      <View
        style={{
          width: innerSize,
          height: innerSize,
          borderRadius: innerSize / 2,
          backgroundColor: colors.surfaceContainerLowest,
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children ? (
          children
        ) : (
          <>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            {sublabel ? <Text style={styles.sublabel}>{sublabel}</Text> : null}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
  },
  halfClip: {},
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'center',
  },
  sublabel: {
    fontSize: 9,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
});

export default CircularProgress;
