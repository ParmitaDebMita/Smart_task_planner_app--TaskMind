import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import { spacing, rounded, shadows } from '../../theme/spacing';
import { useTaskContext } from '../../context/TaskContext';
import AppLogo from '../../components/common/AppLogo';
import Icon from '../../components/common/Icon';

export const ForgotPasswordScreen = () => {
  const { navigateTo, showToast, goBack } = useTaskContext();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = () => {
    if (!email) {
      showToast('Please enter your registered email address', 'error');
      return;
    }
    setSent(true);
    showToast('Password reset link dispatched to your inbox', 'success');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={goBack}>
            <Icon name="arrow_back" size={22} color={colors.onSurface} />
          </TouchableOpacity>
          <AppLogo size={42} />
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your university email address and we'll send you recovery instructions.
          </Text>

          <View style={styles.card}>
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

            <TouchableOpacity
              style={styles.resetBtn}
              onPress={handleReset}
              activeOpacity={0.85}
            >
              <Text style={styles.resetBtnText}>{sent ? 'Resend Reset Link' : 'Send Recovery Link'}</Text>
            </TouchableOpacity>

            {sent && (
              <View style={styles.successBox}>
                <Icon name="check_circle" size={18} color={colors.tertiary} />
                <Text style={styles.successText}>
                  Link sent to {email}. Check your spam if not received within 2 minutes.
                </Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.backToLogin} onPress={() => navigateTo('Login')}>
          <Text style={styles.backToLoginText}>Back to Sign In</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...typography.headlineMd,
    color: colors.onSurface,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: spacing.lg,
  },
  card: {
    width: '100%',
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.md,
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
  resetBtn: {
    height: 48,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.xs,
  },
  resetBtnText: {
    ...typography.labelLg,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: spacing.sm,
    borderRadius: rounded.md,
  },
  successText: {
    ...typography.bodySm,
    color: colors.tertiary,
    flex: 1,
  },
  backToLogin: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  backToLoginText: {
    ...typography.labelMd,
    color: colors.primaryContainer,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
