import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import Icon from './Icon';

export const Toast = () => {
  const { toast } = useTaskContext();

  if (!toast.visible) return null;

  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  let iconName = 'check_circle';
  let iconColor = colors.tertiaryFixed;
  if (isError) {
    iconName = 'error';
    iconColor = colors.errorCoral;
  } else if (isInfo) {
    iconName = 'info';
    iconColor = colors.primaryFixed;
  }

  return (
    <View style={styles.toastContainer}>
      <View style={styles.toastBox}>
        <Icon name={iconName} size={20} color={iconColor} />
        <Text style={styles.toastText} numberOfLines={2}>
          {toast.message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 72,
    left: spacing.margin,
    right: spacing.margin,
    alignItems: 'center',
    zIndex: 9999,
  },
  toastBox: {
    backgroundColor: colors.inverseSurface,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: rounded.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    maxWidth: 420,
    width: '100%',
    ...shadows.lg,
  },
  toastText: {
    ...typography.bodySm,
    color: colors.inverseOnSurface,
    fontWeight: '500',
    flex: 1,
  },
});

export default Toast;
