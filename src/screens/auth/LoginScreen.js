import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import AppLogo from '../../components/common/AppLogo';
import Icon from '../../components/common/Icon';

export const LoginScreen = () => {
  const { navigateTo, showToast } = useTaskContext();
  const [email, setEmail] = useState('alex.chen.cs@university.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email) {
      showToast('Please enter your university email', 'error');
      return;
    }
    showToast(`Welcome back, Alex! 👋`, 'success');
    navigateTo('HomeDashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      <View style={styles.container}>
        <View style={styles.brandHeader}>
          <AppLogo size={52} />
          <Text style={styles.title}>Sign in to TaskMind</Text>
          <Text style={styles.subtitle}>Harmonize your study timetable & tasks</Text>
        </View>

        <View style={styles.formCard}>
          {/* Email Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>University Email</Text>
            <View style={styles.inputWrapper}>
              <Icon name="mail" size={18} color={colors.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="student@university.edu"
                placeholderTextColor={colors.outline}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={styles.fieldGroup}>
            <View style={styles.passwordLabelRow}>
              <Text style={styles.label}>Password</Text>
              <TouchableOpacity onPress={() => navigateTo('ForgotPassword')}>
                <Text style={styles.forgotLink}>Forgot?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={18} color={colors.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={colors.outline}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                <Icon
                  name={showPassword ? 'visibility_off' : 'visibility'}
                  size={18}
                  color={colors.outline}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign In CTA */}
          <TouchableOpacity
            style={styles.signInBtn}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.signInBtnText}>Sign In</Text>
            <Icon name="arrow_forward" size={18} color={colors.onPrimary} />
          </TouchableOpacity>

          {/* Google SSO */}
          <TouchableOpacity
            style={styles.googleBtn}
            onPress={() => {
              showToast('Connecting via Google OAuth 2.0...', 'info');
              navigateTo('GoogleOAuth');
            }}
            activeOpacity={0.85}
          >
            <Icon name="sync_alt" size={18} color={colors.primaryContainer} />
            <Text style={styles.googleBtnText}>Continue with Google Workspace</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>New to TaskMind? </Text>
          <TouchableOpacity onPress={() => navigateTo('SignUp')}>
            <Text style={styles.signUpLink}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.headlineMd,
    color: colors.onSurface,
    marginTop: spacing.md,
    fontWeight: '700',
  },
  subtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  formCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: rounded.xl,
    padding: spacing.lg,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.6)',
    gap: spacing.md,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotLink: {
    ...typography.labelSm,
    color: colors.primaryContainer,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.md,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: spacing.sm,
    height: 46,
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    ...typography.bodyMd,
    color: colors.onSurface,
    height: '100%',
  },
  eyeBtn: {
    padding: 4,
  },
  signInBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: 4,
    ...shadows.xs,
  },
  signInBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  googleBtn: {
    height: 46,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.8)',
  },
  googleBtnText: {
    ...typography.labelMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  signUpLink: {
    ...typography.labelMd,
    color: colors.primaryContainer,
    fontWeight: '700',
  },
});

export default LoginScreen;
