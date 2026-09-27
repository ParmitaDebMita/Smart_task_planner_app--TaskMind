import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import AppLogo from '../../components/common/AppLogo';
import Icon from '../../components/common/Icon';

export const SplashScreen = () => {
  const { navigateTo } = useTaskContext();

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <AppLogo size={88} />
        <Text style={styles.brandTitle}>TaskMind</Text>
        <Text style={styles.brandTagline}>AI Academic Planner & Study Companion</Text>
      </View>

      <View style={styles.footerSection}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigateTo('onboarding')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Get Started</Text>
          <Icon name="arrow_forward" size={18} color={colors.onPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigateTo('home')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryBtnText}>Enter Demo Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  logoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  brandTitle: {
    ...typography.headlineXl,
    color: colors.onPrimary,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '800',
    marginTop: spacing.md,
  },
  brandTagline: {
    ...typography.bodyMd,
    color: colors.onPrimaryContainer,
    textAlign: 'center',
    maxWidth: 260,
  },
  footerSection: {
    width: '100%',
    maxWidth: 360,
    gap: spacing.sm,
  },
  primaryBtn: {
    height: 48,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  primaryBtnText: {
    ...typography.labelLg,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
  secondaryBtn: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    ...typography.labelMd,
    color: colors.onPrimaryContainer,
    textDecorationLine: 'underline',
  },
});

export default SplashScreen;
